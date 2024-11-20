'use client';

import NavBar from '@/components/NavBar';
import React, { useEffect, useState } from 'react';

const Home = () => {
  // Initialize todoTask as an empty array to store multiple tasks
  const [todoTask, setTodoTask] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState<string>(''); // To manage input value\
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('todo');
    storedTasks && setTodoTask(JSON.parse(storedTasks));
  }, []);

  const handleTodoTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const newTask = e.target.value;
    setTaskInput(newTask); // Update input state with the current task
  };

  const onHandleSubmit = () => {
    // Only add the task if the input is not empty
    if (taskInput.trim() !== '') {
      const updatedTasks = [...todoTask, taskInput];
      setTodoTask(updatedTasks); // Add new task to the list of tasks
      localStorage.setItem('todo', JSON.stringify(updatedTasks)); // Save updated tasks to localStorage
      setTaskInput(''); // Clear the input field after submitting
    } else setError('Enter Todo Data');
  };

  const handleDeleteTask = (index: number) => {
    // Remove task at the specified index
    const updatedTasks = todoTask.filter((_, i) => i !== index);
    setTodoTask(updatedTasks);
    localStorage.setItem('todo', JSON.stringify(updatedTasks)); // Update localStorage
  };

  return (
    <React.Fragment>
      <NavBar />

      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-green-300 to-blue-500">
        <div className="w-full mx-3 sm:mx-0 sm:w-96 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Todo List</h2>

          <div className="mb-4">
            <label htmlFor="task_input" className="block text-sm font-medium text-gray-600 mb-2">
              Task
            </label>
            <input
              value={taskInput}
              onChange={handleTodoTask}
              type="text"
              id="task_input"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your task"
              required
            />
          </div>

          <button
            onClick={onHandleSubmit}
            type="button"
            className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
          >
            Add Task
          </button>

          {error != '' && (
            <div
              className="flex items-center w-full border-2 border-red-700 p-4 mb-4 text-gray-500 bg-white rounded-lg shadow mt-3"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
                <span className="sr-only">Error icon</span>
              </div>
              <div className="ms-3 text-sm font-normal text-red-700">{error}</div>
            </div>
          )}

          <div className="mt-6">
            <ul className="space-y-4">
              {todoTask.length === 0 ? (
                <li className="text-center text-gray-500">No tasks yet</li>
              ) : (
                todoTask.map((task, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
                  >
                    <span className="text-gray-800">{task}</span>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="ml-4 text-white bg-red-600 hover:bg-red-700 rounded-lg px-3 py-1 text-sm transition"
                    >
                      Delete
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
