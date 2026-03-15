module.exports = {
  // ...your config
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /html2canvas/, // <- ignore html2canvas
      },
    ],
  },
};