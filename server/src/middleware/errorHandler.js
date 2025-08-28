// src/middlewares/errorHandler.js
function errorHandler(err, req, res) {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
}

export default errorHandler;
