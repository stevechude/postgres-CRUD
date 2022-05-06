"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json()); // => req.body
//ROUTES//
//get todos
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield db_1.default.query("SELECT * FROM todo");
        res.status(200).json(allTodos.rows);
    }
    catch (err) {
        console.error(err.message);
    }
}));
//get a todo
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield db_1.default.query("SELECT * FROM todo WHERE todo_id = $1", [
            id,
        ]);
        res.status(200).json(todo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
//create a todo
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //await stuff
        const { description } = req.body;
        const newTodo = yield db_1.default.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.status(200).json(newTodo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
//update a todo
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; //WHERE
        const { description } = req.body; //SET
        const updateTodo = yield db_1.default.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.status(201).json("todo was updated!");
    }
    catch (err) {
        console.error(err.message);
    }
}));
//delete a todo
app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTodo = yield db_1.default.query("DELETE FROM todo WHERE todo_id = $1", [
            id,
        ]);
        res.status(201).json("A todo was deleted!!");
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map