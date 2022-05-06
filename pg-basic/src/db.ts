import { Pool } from 'pg';
const pool = new Pool({
    user: "postgres",
    password: "7905",
    database: "todo_database",
    host: "localhost",
    port: 5432
})

export default pool;