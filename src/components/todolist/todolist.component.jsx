import { useState } from "react";
import "./todolist.styles.css";

const TodoList = () => {
  //设置todo初始值
  const initialState = [
    {
      task: "Learn vue.js",
      month: "1",
      date: "2",
      isCompleted: false,
    },
  ];

  //解析初始值
  const [todos, setTodos] = useState(initialState);

  //保存每次新增的task,month,date值
  const [task, setTask] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");

  //input输入值后，改变task,month,date值
  const handleNewTask = (event) => {
    setTask(event.target.value);
  };
  const handleNewMonth = (event) => {
    setMonth(event.target.value);
  };
  const handleNewDate = (event) => {
    setDate(event.target.value);
  };

  //每次点击add提交后，更新todos值，并且清空task值
  const handleSubmit = (event) => {
    // event.preventDefault();
    if (task === "" || month === "" || date === "") {
      return alert("请输入内容");
    }
    setTodos((todos) => [...todos, { task, month, date, isCompleted: false }]);
    setTask("");
    setMonth("");
    setDate("");
  };

  //点击Remove，根据li上的index删除对应的todo子项
  const handleRemoveTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  //点击Toggle，todo的子项被划一条横线
  const handleUpdateTask = (index) => {
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
      let aMonth = parseInt(a.month);
      let bMonth = parseInt(b.month);
      let aDate = parseInt(a.date);
      let bDate = parseInt(b.date);
      return aMonth - bMonth || aDate - bDate;
    });
    setTodos([...todos]);
  };

  //返回
  console.log("render");
  return (
    <div>
      <h1>ToDo List</h1>
      {/* 提交task表单 */}
      <form onSubmit={handleSubmit}>
        Add a todo
        <input
          value={task}
          placeholder="Add New Task"
          onChange={handleNewTask}
          className="input-task"
        />
        <input
          value={month}
          placeholder="Month"
          onChange={handleNewMonth}
          className="month"
        />
        <input
          value={date}
          placeholder="Date"
          onChange={handleNewDate}
          className="date"
        />
        <button type="submit">Add</button>
      </form>
      <br />
      {/* 根据时间排序 */}
      <button type="submit" onClick={() => handleSortByTime()}>
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
              {todo.month}/{todo.date}
            </span>
            <button
              className="toggle"
              type="submit"
              onClick={() => handleUpdateTask(index)}
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
export default TodoList;
