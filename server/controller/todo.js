import { connectToDB } from "../utils/connect.js";
import Todo from "../models/todoModel.js";
import { createError } from "../utils/error.js";

export const getAllsToDo = async (req, res, next) => {
  await connectToDB();
  const todo = await Todo.find({ userId: req.user.id });

  res.status(200).send(todo);
};

export const getTodoById = async (req, res, next) => {
  try {
    await connectToDB();

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return next(createError(404, "Todo not found"));
    }
    if (todo.userId.toString() !== req.user.id) {
      return next(createError(403, "You are not allowed to access this todo"));
    }
    res.status(200).send(todo);
  } catch (error) {
    next(createError(404, "Todo not found"));
  }
};

export const addTodo = async (req, res, next) => {
  console.log(req.body);
  if (!req.body || !req.body.title) {
    return next(createError(400, "Title is required"));
  }
  await connectToDB();
  const newTodo = new Todo({
    userId: req.user.id,
    title: req.body.title,
  });
  await newTodo.save();
  res.status(201).send(newTodo);
};

export const updateTodoById = async (req, res, next) => {
  const id = req.params.id;

  if (!req.body) return next(createError(400, "Missing body"));

  try {
    await connectToDB();
    const todo = await Todo.findById(id);

    if (todo.userId.toString() !== req.user.id)
      return next(createError(403, "You are not allowed to update this todo"));

    todo.title = req.body.title || todo.title;
    if (req.body.isCompleted !== undefined) {
      todo.isCompleted = req.body.isCompleted;
    }
    await todo.save();
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    return next(createError(404, "Todo not found"));
  }
};

export const deleteTodoById = async (req, res, next) => {
  try {
    await connectToDB();

    const todo = await Todo.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!todo.deletedCount) {
      return next(createError(404, "Todo not found"));
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(createError(404, "Todo not found"));
  }
};
