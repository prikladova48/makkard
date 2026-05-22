const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || process.env.APP_PORT || 9256;

app.use(express.static(__dirname));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mini App is running on port ${PORT}`);
});
