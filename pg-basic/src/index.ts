import express, { json } from "express";
import Pool from "./db";
const app = express();
const port = 5000;

app.use(express.json()); // => req.body

//ROUTES//

//get todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await Pool.query("SELECT * FROM todo");

    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a todo
app.post("/todos", async (req, res) => {
  try {
    //await stuff
    const { description } = req.body;
    const newTodo = await Pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const { description } = req.body; //SET

    const updateTodo = await Pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.status(201).json("todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await Pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.status(201).json("A todo was deleted!!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
