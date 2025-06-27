import React, { useEffect, useState } from "react";
import { app, db, auth } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  // Redirect if user not logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(items);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        task: newTask.trim(),
        completed: false,
      });
      setTodos([...todos, { id: docRef.id, task: newTask.trim(), completed: false }]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Toggle complete
  const toggleComplete = async (id, completed) => {
    try {
      await updateDoc(doc(db, "todos", id), { completed: !completed });
      setTodos(todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Sign out error:", error));
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "40px" }}>Loading...</div>;

  return (
    <div style={styles.wrapper}>
      <button onClick={handleSignOut} style={styles.signOut}>🚪 Sign Out</button>

      <div style={styles.container}>
        <h1 style={styles.title}>My Todo List 📝</h1>

        {/* 📷 Inserted image */}
        <img
          src="/undraw_to-do-list_eoia.png"
          alt="To-Do Illustration"
          style={{ width: '220px', margin: '0 auto 20px', display: 'block' }}
        />

        {/* ➕ Add task input */}
        <form onSubmit={addTodo} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button type="submit" style={{
            padding: "10px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>Add</button>
        </form>

        {/* 📝 List of todos */}
        <div style={styles.todoList}>
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              style={{
                ...styles.todoItem,
                textDecoration: todo.completed ? "line-through" : "none",
                animationDelay: `${index * 100}ms`,
              }}
              className="fade-in"
              onClick={() => toggleComplete(todo.id, todo.completed)}
            >
              <span>{todo.task}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(todo.id);
                }}
                style={{
                  marginLeft: "10px",
                  background: "transparent",
                  border: "none",
                  color: "#d00",
                  cursor: "pointer",
                  float: "right"
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.6s ease forwards;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#f0f4f8",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
    position: "relative",
  },
  signOut: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#ff6b6b",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    zIndex: 2,
  },
  container: {
    maxWidth: "600px",
    margin: "100px auto 0",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    width: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  todoList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "10px",
  },
  todoItem: {
    backgroundColor: "#dff0d8",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "500",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
};
export default App;

