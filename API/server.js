import mysql from "mysql"

export const server = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ph@_b132_204",
    database: "todolist",
});