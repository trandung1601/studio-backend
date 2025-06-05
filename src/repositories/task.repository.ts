import pool from '../config/mysqlClient';

export async function getAllTasks() {
    const [rows] = await pool.execute('SELECT * FROM task');
    return rows;
}