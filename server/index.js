const express = require("express");
const path = require("path");

const PORT = 5000;
const app = express();

app.get("/api/message", (req, res) => {
    res.send("Welcome to the node server");
});

if (process.env.NODE_ENV === "production") {
  // Serve static files from client/dist in production
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Serve index.html for any unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
} else {
  console.log("⚡ Development mode: not serving dist folder");
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
