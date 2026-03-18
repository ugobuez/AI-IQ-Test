import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const NUM_AI_QUESTIONS = 8;

app.get("/api/generate-question", async (req, res) => {
  try {
    console.log("🔄 Received request for AI questions...");

    if (!process.env.FIREWORKS_API_KEY) {
      console.error("❌ FIREWORKS_API_KEY is missing in .env");
      return res.status(500).json({ error: "Missing Fireworks API key" });
    }

    const url = "https://api.fireworks.ai/inference/v1/chat/completions";

    const body = {
      model: "accounts/fireworks/models/llama-v3p3-70b-instruct",   // ← Full correct ID

      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that ALWAYS responds with valid JSON only. Never add explanations or markdown."
        },
        {
          role: "user",
          content: `Generate exactly ${NUM_AI_QUESTIONS} high-quality IQ test questions.

Return your response as this exact JSON object (no extra text at all):

{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["option 1", "option 2", "option 3", "option 4"],
      "answer": "exact matching option text"
    }
  ]
}`
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    };

    console.log("📤 Sending request to Fireworks...");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    console.log(`📥 Fireworks status: ${response.status} ${response.statusText}`);

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Fireworks Error:", JSON.stringify(data, null, 2));
      return res.status(500).json({ error: data });
    }

    console.log("✅ Fireworks returned successful response");

    let rawText = data.choices?.[0]?.message?.content || "{}";
    rawText = rawText.replace(/```json\s*/gi, "").replace(/```\s*$/gi, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      console.error("❌ JSON Parse Failed. Raw text:", rawText);
      return res.json([]);
    }

    let aiQuestions = Array.isArray(parsed) ? parsed : (parsed.questions || parsed);

    if (!Array.isArray(aiQuestions)) {
      console.error("❌ No array found in response:", parsed);
      return res.json([]);
    }

    aiQuestions = aiQuestions.map(q => ({
      ...q,
      type: "AI-Generated",
      difficulty: "medium"
    }));

    console.log(`✅ Successfully generated ${aiQuestions.length} questions`);
    res.json(aiQuestions);

  } catch (err) {
    console.error("💥 Server Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(7070, () => {
  console.log("🚀 Server running on http://localhost:7070 (using Fireworks AI)");
});