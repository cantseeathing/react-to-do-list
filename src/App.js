import { useState } from "react";
import "./App.css";

const initialToDos = [{ id: Date.now(), name: "Study", active: false }];
export default function App() {
  const [toDo, setToDo] = useState(initialToDos);
  function handleAddNewTask(task) {
    if (!task) return;
    setToDo((toDo) => [...toDo, { name: task, active: false, id: Date.now() }]);
  }
  function handleTaskCompletion(SelectedTask) {
    setToDo((toDo) =>
      toDo.map((task) =>
        task.id === SelectedTask ? { ...task, active: !task.active } : task
      )
    );
  }

  function handleRemoveTask(SelectedTask) {
    setToDo((toDo) => toDo.filter((task) => task.id !== SelectedTask));
  }
  return (
    <div className="app">
      <h1 className="main-title">To-do-List</h1>
      <AddTask handleAddNewTask={handleAddNewTask} />
      <TaskList
        handleTaskCompletion={handleTaskCompletion}
        toDo={toDo}
        handleRemoveTask={handleRemoveTask}
      />
      <Stats toDo={toDo} />
    </div>
  );
}

function AddTask({ handleAddNewTask }) {
  const [newTask, setNewTask] = useState("");
  function addNewTask(newTask) {
    handleAddNewTask(newTask);
    setNewTask("");
  }
  return (
    <div className="add-task">
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        type="text"
        placeholder="Add new task!"
      ></input>
      <img
        onClick={() => addNewTask(newTask)}
        className="add-image"
        src="./add.png"
        alt="add"
      />
    </div>
  );
}

function TaskList({ handleTaskCompletion, toDo, handleRemoveTask }) {
  return (
    <div className="task-list">
      {toDo.map((task) => (
        <Task
          key={task.id}
          handleTaskCompletion={handleTaskCompletion}
          task={task}
          handleRemoveTask={handleRemoveTask}
        />
      ))}
    </div>
  );
}

function Task({ handleTaskCompletion, task, handleRemoveTask }) {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        onChange={() => handleTaskCompletion(task.id)}
        value={task.active}
      ></input>
      <p className={task.active ? "task-complete" : "task-incomplete"}>
        {task.name}
      </p>
      <img
        onClick={() => handleRemoveTask(task.id)}
        className="add-image"
        src="./remove.png"
        alt="remove"
      />
    </div>
  );
}

function Stats({ toDo }) {
  const allTasks = toDo.length;
  const completed = toDo.filter((task) => task.active === true).length;
  return (
    <div className="stats">
      {allTasks === 0 ? (
        <p>Add tasks to be tracked!</p>
      ) : (
        <p>
          {completed}/{allTasks} tasks completed.
        </p>
      )}
      {completed === allTasks && allTasks > 0 && <span> Amazing job!</span>}
    </div>
  );
}
