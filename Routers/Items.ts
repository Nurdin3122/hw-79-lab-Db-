import express from "express";
import mysqldb from "../MySqlDb";
const itemsRouter = express.Router();
itemsRouter.get('/', async (req, res) => {
    const connection = await mysqldb.getConnection()
    const [rows] = await connection.query('SELECT * FROM items');
    res.json(rows);
});

export default itemsRouter

