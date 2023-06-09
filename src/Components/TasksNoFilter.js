import React, { useState } from "react";
import "./App.css";
import _ from "lodash";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const initialTasks = [
    { text: "do the dishes", color: "green", isComplete: false },
    { text: "play tennis", color: "black", isComplete: true },
    { text: "watch tv", color: "red", isComplete: false },
  ];
  const [tasks, setTasks] = useState(initialTasks);
  const inputboxOnchangeHandler = (e) => {
    setUserInput(e.target.value);
  };
  const addTaskHandler = () => {
    const newCopy = _.cloneDeep(tasks);
    newCopy.push({ text: userInput, color: "black", isComplete: false });
    setTasks(newCopy);
    setUserInput("");
  };
  const taskCompleteToggleHandler = (i) => {
    const copy = _.cloneDeep(tasks);
    copy[i].isComplete = !copy[i].isComplete;
    setTasks(copy);
  };

  return (
    <div>
      <input onChange={inputboxOnchangeHandler} value={userInput}></input>
      <button onClick={addTaskHandler}>ADD TASK</button>
      {tasks.map((e, i) => {
        const taskColor = { color: e.color };
        return (
          <div key={i} style={taskColor}>
            <input
              onChange={() => taskCompleteToggleHandler(i)}
              type="checkbox"
              checked={e.isComplete}
            />
            {e.text}
            <select
              onChange={(e) => {
                const selectedColor = e.target.value;
                if (selectedColor === "") return;

                const copy = _.cloneDeep(tasks);
                copy[i].color = selectedColor;
                setTasks(copy);
              }}
            >
              <option value=""></option>
              <option value="black"> black </option>
              <option value="green"> green </option>
              <option value="red"> red </option>
              <option value="blue"> blue </option>
            </select>
            <button
              onClick={() => {
                const copyTasks = _.cloneDeep(tasks);
                setTasks(copyTasks.slice(0, i).concat(copyTasks.slice(i + 1)));
              }}
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default App;
