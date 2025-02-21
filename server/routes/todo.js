import express from "express";
import {
  addTodo,
  deleteTodoById,
  getAllsToDo,
  getTodoById,
  updateTodoById,
} from "../controller/todo.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getAllsToDo);

router.post("/", verifyToken, addTodo);

router.get("/:id", verifyToken, getTodoById);

router.put("/:id", verifyToken, updateTodoById);

router.delete("/:id", verifyToken, deleteTodoById);

export default router;
