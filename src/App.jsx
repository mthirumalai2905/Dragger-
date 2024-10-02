import React from 'react';
import { useState } from 'react';
import "./App.css";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import Column from './components/Column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Input from './components/Input/Input';
const App = () => {
  const [tasks, setTasks] = useState([
    {id: 1, title: "Solve Daily LeetCode POTD"},
    {id: 2, title: "Solve Daily GFG POTD"},
    {id: 3, title: "Give CodeChef Contest"},
    {id: 4, title: "Make a Readme Update"},
    {id: 5, title: "Keep all the profile Greens"}
  ]);

  const getTaskPos = id => tasks.findIndex(task => task.id === id);

  const handleDragEnd = event => {
    const {active, over} = event;

    if (!over || active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors = [
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  ];

  const addTask = title => {
    setTasks((task) => [...task, {id: tasks.length+1, title}])
  }
  return (
    <div className='App'>
      <h1>My Tasks ✅</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Input onSubmit={addTask} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
};

export default App;
