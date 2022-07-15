import { useState, useEffect, useRef } from "react";
import "./todolistref.styles.css";
import axios from "axios";

const TodoListRef = () => {
  //设置todo初始值
  const initialState = [
    {
      task: "Learn vue.js",
      year: "2022",
      month: "1",
      day: "2",
      isCompleted: false,
    },
  ];

  //解析初始值
  const [todos, setTodos] = useState(initialState);
  const taskRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  //1.查找
  useEffect(() => {
    axios
      .get("http://localhost:8080/todos")
      .then((response) => response.data)
      .then((result) => setTodos(result.data));
  }, []);

  //每次点击add提交后，更新todos值，并且清空task值
  const handleSubmit = (event) => {
    event.preventDefault();

    let taskref = taskRef.current.value;
    let yearref = yearRef.current.value;
    let monthref = monthRef.current.value;
    let dayref = dayRef.current.value;

    if (taskref === "" || yearref === "" || monthref === "" || dayref === "") {
      return alert("请输入内容");
    }

    setTodos([
      ...todos,
      {
        task: taskref,
        year: yearref,
        month: monthref,
        day: dayref,
        isCompleted: false,
      },
    ]);

    taskRef.current.value = "";
    yearRef.current.value = "";
    monthRef.current.value = "";
    dayRef.current.value = "";
  };

  //点击Remove，根据li上的index删除对应的todo子项
  const handleRemoveTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  //点击Toggle，todo的子项被划一条横线
  const handleUpdayTask = (index) => {
    let newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  // 根据时间排序
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

  //返回
  console.log("render");
  return (
    <div>
      <h1>ToDo List Ref</h1>
      {/* 输入task */}
      Add a todo
      <input placeholder="Add New Task" ref={taskRef} className="input-task" />
      <input placeholder="Year" ref={yearRef} className="year" />
      <input placeholder="Month" ref={monthRef} className="month" />
      <input placeholder="Day" ref={dayRef} className="day" />
      {/* 提交button */}
      <button onClick={handleSubmit}>Add</button>
      <br />
      {/* 根据时间排序button */}
      <button type="submit" className="sort" onClick={() => handleSortByTime()}>
        Sort By Time
      </button>
      {/* todo子项列表 */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              className="task-text"
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.task}
            </span>
            <span
              className="time"
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.year}/{todo.month}/{todo.day}
            </span>
            <button
              className="toggle"
              type="submit"
              onClick={() => handleUpdayTask(index)}
            >
              Toggle
            </button>
            <button
              className="remove"
              type="submit"
              onClick={() => handleRemoveTask(index)}
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
