import React, { Component } from "react";

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      isEditing: false,
      currentTodoId: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    const { todos, newTodo } = this.state;
    if (newTodo.trim()) {
      const newTask = {
        id: todos.length + 1,
        text: newTodo,
        isDone: false,
      };
      this.setState({
        todos: [...todos, newTask],
        newTodo: "",
      });
    }
  };

  deleteTodo = (id) => {
    const updatedTodos = this.state.todos
      .filter((todo) => todo.id !== id)
      .map((todo, index) => ({ ...todo, id: index + 1 }));
    this.setState({ todos: updatedTodos });
  };

  markDone = (id) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    this.setState({ todos: updatedTodos });
  };

  startEdit = (id) => {
    const taskToEdit = this.state.todos.find((todo) => todo.id === id);
    this.setState({
      isEditing: true,
      currentTodoId: id,
      newTodo: taskToEdit.text,
    });
  };

  saveEdit = () => {
    const { todos, currentTodoId, newTodo } = this.state;
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTodoId ? { ...todo, text: newTodo } : todo
    );
    this.setState({
      todos: updatedTodos,
      isEditing: false,
      currentTodoId: null,
      newTodo: "",
    });
  };

  render() {
    const { todos, newTodo, isEditing } = this.state;

    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Todo App</h1>
        <div className="card shadow p-4 mb-4 bg-light">
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              value={newTodo}
              onChange={this.handleInputChange}
              placeholder="Yangi vazifa..."
            />
            {isEditing ? (
              <button className="btn btn-warning" onClick={this.saveEdit}>
                Saqlash
              </button>
            ) : (
              <button className="btn btn-primary" onClick={this.addTodo}>
                Qo'shish
              </button>
            )}
          </div>
        </div>

        <div className="card shadow bg-light p-4">
          <h3 className="text-center mb-4">Vazifalar ro'yxati</h3>
          {todos.length === 0 ? (
            <p className="text-center text-muted">Hozircha vazifalar yo'q.</p>
          ) : (
            <ul className="list-group">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    todo.isDone ? "list-group-item-success" : ""
                  }`}
                >
                  <span>
                    <strong>{todo.id}.</strong>{" "}
                    <span
                      style={{
                        textDecoration: todo.isDone ? "line-through" : "none",
                      }}
                    >
                      {todo.text}
                    </span>
                  </span>
                  <div>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => this.markDone(todo.id)}
                    >
                      {todo.isDone ? "Bekor qilish" : "Bajarildi"}
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => this.startEdit(todo.id)}
                    >
                      Tahrirlash
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.deleteTodo(todo.id)}
                    >
                      O'chirish
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default TodoApp;
