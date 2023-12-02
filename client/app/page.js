"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

export default function Home() {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch("http://localhost:8080/tasks/1")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.title);
      });
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.code}>{message}</h1>
      <TaskList />
    </main>
  );
}
