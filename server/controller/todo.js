export const getAllsToDo = async (req, res, next) => {
  res.send("all todos");
};

export const getTodoById = async (req, res, next) => {
  res.send(`get todo with id: ${req.params.id}`);
};

export const addTodo = async (req, res, next) => {
  res.send("create todo");
};

export const updateTodoById = async (req, res, next) => {
  res.send(`update todo with id: ${req.params.id}`);
};

export const deleteTodoById = async (req, res, next) => {
  res.send(`delete todo with id: ${req.params.id}`);
};
