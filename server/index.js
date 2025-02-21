import express from "express";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";

const app = express();
const PORT = 3000;

app.use("/api/user", authRoutes);
app.use("/api/todo", todoRoutes);

app.get("/", (req, res, next) => {
  res.send("Hello World");
});
//error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    error: message,
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
