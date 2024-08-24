import mysql,{ Connection } from "mysql2/promise";

let connection:Connection

const mysqldb = {
    init:async () => {
        connection = await mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'0555635713Nn',
            database:'office',
        });
    },
    getConnection: () => {
        return connection;
    }
}
export default mysqldb