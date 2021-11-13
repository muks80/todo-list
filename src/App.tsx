import React, { useState } from 'react';
import './App.css';
import Task, { TaskInt } from './components/Task';

const App: React.FC = () => {

  interface AllTasksInt {
    currentTask: TaskInt;
    allTasks: Array<TaskInt>
  }

  const [taskState, setTaskState] = useState<AllTasksInt>({
    currentTask: {
      name: '',
      task: '',
      urgent: false,
      deleteTask: () => {}
    },
    allTasks: []
  })

  const onChangeHandler = <P extends keyof TaskInt>(prop: P, value: TaskInt[P]) => {
    setTaskState({
      ...taskState,
      currentTask: {
        ...taskState.currentTask,
        [prop]: value
      }
    })
  };

  const submitForm = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    setTaskState({
      currentTask: {
        name: '',
        task: '',
        urgent: false,
        deleteTask: () => {}
      },
      allTasks: [
        ...taskState.allTasks,
        taskState.currentTask
      ]
    })
  }

  const deleteHandler = (index: number): void => {
    const filterUsers = taskState.allTasks.filter((task, i) => {
      return index !== i
    })
    setTaskState({
      ...taskState,
      allTasks: filterUsers
    })
  }

  const allTasks = taskState.allTasks.map((task, i) => {
    return (
      <Task 
        key={i} 
        name={task.name}
        task={task.task}
        urgent={task.urgent}
        deleteTask={() => deleteHandler(i)}
      />
    )
  })

  return (
    <div className="container">
      <h1>Todo List with React and Typescript</h1>
      <form onSubmit={submitForm} className="card">
        <label htmlFor='userName'>Task Name:</label>
        <input 
          id='userName'
          required
          type='text'
          name='name'
          value={taskState.currentTask.name}
          onChange={e => onChangeHandler('name', e.target.value)}
        />
        <label htmlFor='task'>Description:</label>
        <input 
          id='task'
          required
          type='text'
          name='task'
          value={taskState.currentTask.task}
          onChange={e => onChangeHandler('task', e.target.value)}
        />
        <label htmlFor='task'>Urgent:</label>
        <input
        type="checkbox"
        checked={taskState.currentTask.urgent}
        onChange={() => {onChangeHandler('urgent', !taskState.currentTask.urgent);
        }}
        />
        <br/>
        <button type='submit' className="submitBtn">Add Task</button>
      </form>
      {allTasks}
    </div>
  );
}

export default App;