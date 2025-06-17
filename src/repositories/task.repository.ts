import pool from '../config/mysqlClient';
import { Task } from '../services/task.service';

export async function getAllTasks() {
    const [rows] = await pool.execute('SELECT * FROM task');
    return rows as Task[];
}

export async function getTasksToday() {
    const [rows] = await pool.execute(`
    SELECT * FROM task
    WHERE DATE(start) = CURDATE()
  `);
    return rows;
}