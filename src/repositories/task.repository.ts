import { ResultSetHeader } from 'mysql2';

import pool from '../config/mysqlClient';
import { Task } from '../services/task.service';
import { toMySQLDateTime } from '../utils/dateUtils';

export async function getAllTasks() {
    const [rows] = await pool.execute(`SELECT 
      id,
      title,
      description,
      location,
      start_time AS startTime,
      end_time AS endTime,
      create_at AS createAt
    FROM task`);
    return rows as Task[];
}

export async function getTasksToday() {
    const [rows] = await pool.execute(`
    SELECT * FROM task
    WHERE DATE(start_time) = CURDATE()
  `);
    return rows;
}

export type TaskInsert = Omit<Task, 'id' | 'created_at'>;
export async function insertTask(task: TaskInsert): Promise<number> {


    const { title, location, description, startTime, endTime } = task;
    console.log("Task data before insert:", { title, location, description, startTime, endTime });


    const [result] = await pool.execute<ResultSetHeader>(
        `
    INSERT INTO task (title, location, description, start_time, end_time)
    VALUES (?, ?, ?, ?, ?)
  `,
        [title, location, description, toMySQLDateTime(startTime), toMySQLDateTime(endTime)]
    );

    return result.insertId; // trả về ID của task mới thêm
}