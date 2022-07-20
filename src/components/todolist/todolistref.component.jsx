import { useState, useEffect, useRef } from "react";
import "./todolistref.styles.css";
import axios from "axios";
import React from "react";
import Button from "@mui/material/Button";

const localhost = axios.create({
  baseURL: "http://localhost:8080/todos",
});

const TodoListRef = () => {
  //解析初始值
  const [todos, setTodos] = useState([]);
  const taskRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const [error, setError] = React.useState(null);

  //1.get 查找SELECT
  useEffect(() => {
    axios
      .get("http://localhost:8080/todos")
      .then((response) => response.data)
      .then((result) => setTodos(result.data))
      .catch((error) => {
        setError(error);
      });
  }, []);
  if (error) return `Error: ${error.message}`;
  if (!todos) return "No todos!";

  //2.post 增加INSERT
  const handleSubmit = (event) => {
    event.preventDefault();

    let taskref = taskRef.current.value;
    let yearref = yearRef.current.value;
    let monthref = monthRef.current.value;
    let dayref = dayRef.current.value;

    if (taskref === "" || yearref === "" || monthref === "" || dayref === "") {
      return alert("请输入内容");
    }

    axios
      .post("http://localhost:8080/todos", {
        task: taskref,
        year: yearref,
        month: monthref,
        day: dayref,
        status: 1,
      })
      .then((response) => response.data)
      .then((result) => setTodos(result.data))
      .then(() => {
        alert("Add insert succeed!");
      });

    taskRef.current.value = "";
    yearRef.current.value = "";
    monthRef.current.value = "";
    dayRef.current.value = "";
  };

  //3.put 更新UPDATE
  const handleUpdayTask = (taskId, status) => {
    axios
      .put(`${"http://localhost:8080/todos"}/${taskId}`, {
        status: status,
      })
      .then((response) => response.data)
      .then((result) => {
        let newTodos = todos.map((todo) => {
          if (todo.taskId === taskId) {
            todo.status = result.data[0].status;
          }
          return todo;
        });
        setTodos(newTodos);
      })
      .then(() => {
        alert("Toggle update succeed!");
      });
  };

  //4.delete 删除DELETE
  const handleRemoveTask = (taskId) => {
    // axios
    //   .delete(`${"http://localhost:8080/todos"}/${taskId}`)
    //   .then(() => {
    //     const newTodos = todos.filter((item) => item.taskId !== taskId);
    //     setTodos(newTodos);
    //   })
    //   .then(() => {
    //     alert("Remove deleted succeed!");
    //   });

    deletePost(taskId);
  };

  async function deletePost(taskId) {
    await localhost.delete(`/${taskId}`);
    const newTodos = todos.filter((item) => item.taskId !== taskId);
    setTodos(newTodos);
  }

  // 根据时间排序sort
  const handleSortByTime = () => {
    todos.sort((a, b) => {
      let aYear = parseInt(a.year);
      let bYear = parseInt(b.year);
      let aMonth = parseInt(a.month);
      let bMonth = parseInt(b.month);
      let aDay = parseInt(a.day);
      let bDay = parseInt(b.day);
      return aYear - bYear || aMonth - bMonth || aDay - bDay;
    });
    setTodos([...todos]);
  };

  console.log("render");
  //返回html
  return (
    <div className="todo">
      <h1>ToDo List Ref</h1>
      {/* 输入task */}
      Add a todo
      <input placeholder="Add New Task" ref={taskRef} className="input-task" />
      <input placeholder="Year" ref={yearRef} className="year" />
      <input placeholder="Month" ref={monthRef} className="month" />
      <input placeholder="Day" ref={dayRef} className="day" />
      {/* 提交button */}
      {/* <button onClick={handleSubmit}>Add</button> */}
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
      <br />
      {/* 根据时间排序button */}
      <button type="submit" className="sort" onClick={() => handleSortByTime()}>
        Sort By Time
      </button>
      {/* todo子项列表 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.taskId}>
            <span
              className="task-text"
              style={{
                textDecoration: todo.status !== 1 ? "line-through" : "none",
              }}
            >
              {todo.task}
            </span>
            <span
              className="time"
              style={{
                textDecoration: todo.status !== 1 ? "line-through" : "none",
              }}
            >
              {todo.year}/{todo.month}/{todo.day}
            </span>
            <button
              className="toggle"
              type="submit"
              onClick={() => handleUpdayTask(todo.taskId, todo.status)}
            >
              Toggle
            </button>
            <button
              className="remove"
              type="submit"
              onClick={() => handleRemoveTask(todo.taskId)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoListRef;
