import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* Test route */
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

app.get("/api/generate-question", async (req, res) => {
  try {

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `Return ONLY JSON like this:
{
 "question":"2,4,8,16,?",
 "options":["18","24","32","20"],
 "answer":"32"
}`
        }
      ]
    });

    const text = completion.choices[0].message.content;

    const question = JSON.parse(text);

    res.json(question);

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});