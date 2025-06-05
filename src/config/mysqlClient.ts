// src/db/mysqlClient.ts
import mysql from 'mysql2/promise';

import { dbConfig } from '../config/db.config';

const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
