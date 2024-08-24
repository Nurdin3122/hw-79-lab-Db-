import express from "express";
import {Item,} from "../types";
import mysqldb from "../MySqlDb";
import {ResultSetHeader} from "mysql2";
const categoriesRouter = express.Router();
categoriesRouter.get('/', async (req, res) => {
    const result = await mysqldb.getConnection().query(
        'SELECT * FROM categories'
    );
    const categories = result[0]
    return res.send(categories);
});

categoriesRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await mysqldb.getConnection().query(
        'SELECT * FROM categories WHERE id = ? ',
        [id]
    );
    const categories = result[0] as Item[]
    if (categories.length ===  0) {
        return res.status(404).send({error:'sorry'})
    }
    return res.send(categories);
});

categoriesRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: 'Required fields are missing' });
    }
    const category = {
        name:req.body.name,
        description:req.body.description,
    }

    const InsertResult = await mysqldb.getConnection().query(
        'INSERT INTO categories (name ,description) VALUES (? , ?)',
        [category.name ,category.description],
    );

    const resultHeader = InsertResult[0] as ResultSetHeader;
    const getNewResult = await mysqldb.getConnection().query(
        'SELECT * FROM categories WHERE id = ?',
        [resultHeader.insertId]
    );
    const categories = getNewResult[0] as Item[];
    return res.send(categories[0]);
});

categoriesRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;


    const [relatedResults] = await mysqldb.getConnection().query(
        'SELECT COUNT(*) AS count FROM categories WHERE id = ?',
        [id]
    );
    const relatedCount = (relatedResults as any)[0].count;

    if (relatedCount > 0) {
        return res.status(400).send({ error: 'он связанн  и не может быть удален' });
    }


    const [result] = await mysqldb.getConnection().query(
        'DELETE FROM categories WHERE id = ?',
        [id]
    );

    if ((result as any).affectedRows === 0) {
        return res.status(404).send({ error: 'не найден' });
    }

    return res.send({ message: 'удален' });

});

export default categoriesRouter

