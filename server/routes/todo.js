import express from "express";
import {
  addTodo,
  deleteTodoById,
  getAllsToDo,
  getTodoById,
  updateTodoById,
} from "../controller/todo.js";

const router = express.Router();

router.get("/", getAllsToDo);

router.post("/", addTodo);

router.get("/:id", getTodoById);

router.put("/:id", updateTodoById);

router.delete("/:id", deleteTodoById);

export default router;
