import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.on('connection', (connection: any) => {
    console.log('New DB connection established with threadId:', connection.threadId);
});

export const execQuery = (query: string, queryInput?: any) => {
    return new Promise((resolve, reject) => {
        db.query(query, queryInput, (error: any, result: any) => {
            if(error) {
                reject(error)
            }else {
                resolve(result)
            }
        })
    })
}