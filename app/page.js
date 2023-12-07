"use client";
import React, { useState, useEffect } from 'react';
import TaskList from '/app/components/taskList';


export default function Home() {
  

  return (
    <main className='main'>
      
      <h1 className='todo-heading'>Get Things Done</h1>
      
      <TaskList />
    </main>
  );
}
