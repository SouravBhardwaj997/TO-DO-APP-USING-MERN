import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TodoPage = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(API_URL);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoBeingUpdated, setTodoBeingUpdated] = useState({});
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todo/fetch`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (title.length <= 0) {
      toast.error("Enter a Todo!!", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    try {
      const newTodo = { title, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      const response = await axios.post(
        `${API_URL}/api/todo/create`,
        {
          ...newTodo,
        },
        {
          withCredentials: true,
        }
      );
      fetchTodos();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
      setTitle("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/todo/delete/${id}`, {
        withCredentials: true,
      });
      fetchTodos();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const updatingTodo = async (id) => {
    const todo = todos.find((todo) => todo._id == id);
    setTodoBeingUpdated(todo);
    console.log(todoBeingUpdated);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
    setTitle(todo.title);
    setIsUpdating(true);
  };

  const updateTodo = async () => {
    if (title.length <= 0) {
      toast.error("Title cannot be empty", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    try {
      const updatedTodo = { title };
      const response = await axios.put(
        `${API_URL}/api/todo/update/${todoBeingUpdated._id}`,
        updatedTodo,
        {
          withCredentials: true,
        }
      );
      setIsUpdating(false);
      setTitle("");
      setTodoBeingUpdated({});
      fetchTodos();
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      const response = await axios.put(
        `${API_URL}/api/todo/update/${id}`,
        {
          completed: updatedTodos.find((todo) => todo._id === id).completed,
        },
        {
          withCredentials: true,
        }
      );
      fetchTodos();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
    }
  };
  return (
    <>
      <>
        <div className="min-w-md bg-white p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Todo List</h2>

          <div className="flex mb-6">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {!isUpdating ? (
              <button
                className="px-4 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                onClick={addTodo}
              >
                Add
              </button>
            ) : (
              <button
                className="px-4 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                onClick={updateTodo}
              >
                Update
              </button>
            )}
          </div>

          <ul className="space-y-4">
            {todos.map((item) => (
              <li
                className="flex items-start justify-between space-x-4"
                key={item._id}
              >
                <div className="flex items-center space-x-2 w-full">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={item.completed}
                    onChange={() => toggleCompleted(item._id)}
                  />

                  <span
                    className={`text-lg break-words whitespace-normal flex-1 ${
                      item.completed ? "text-gray-500" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={() => deleteTodo(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className={`focus:outline-none text-white ${
                      item.completed ? "bg-gray-700" : "bg-green-700"
                    } ${
                      !item.completed && "hover:bg-green-800"
                    } focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5`}
                    onClick={() => updatingTodo(item._id)}
                    disabled={item.completed}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    </>
  );
};

export default TodoPage;
