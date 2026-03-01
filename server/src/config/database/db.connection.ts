import mysql, { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.on('connection', (connection: mysql.PoolConnection) => {
    console.log('New DB connection established.');
});

export type DBResult = RowDataPacket[] | OkPacket | ResultSetHeader;

export const execQuery = (query: string, queryInput?: Array<string | number | boolean | null | object>): Promise<DBResult> => {
    return new Promise((resolve, reject) => {
        db.query(query, queryInput as any, (error: mysql.QueryError | null, result: DBResult) => {
            if(error) {
                reject(error)
            }else {
                resolve(result)
            }
        })
    })
}