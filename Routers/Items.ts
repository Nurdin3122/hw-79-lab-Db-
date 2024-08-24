import express from "express";
import {Item, ItemMutation} from "../types";
import mysqldb from "../MySqlDb";
import {ResultSetHeader} from "mysql2";
const itemsRouter = express.Router();
itemsRouter.get('/', async (req, res) => {
    const result = await mysqldb.getConnection().query(
        'SELECT * FROM items'
    );
    const items = result[0] as Item[]
    return res.send(items);
});

itemsRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await mysqldb.getConnection().query(
        'SELECT * FROM items WHERE id = ? ',
        [id]
    );
    const items = result[0] as Item[]
    if (items.length ===  0) {
        return res.status(404).send({error:'sorry'})
    }
    return res.send(items);
});

itemsRouter.post('/', async (req, res) => {
    console.log('Request body:', req.body);
    if (!req.body.name) {
        return res.status(400).send({ error: 'Required fields are missing' });
    }
   const item: ItemMutation = {
       category_id:parseInt(req.body.category_id),
       location_id:parseInt(req.body.location_id),
       name:req.body.name,
       description:req.body.description,
       image:req.body.file,
   }

   const InsertResult = await mysqldb.getConnection().query(
       'INSERT INTO items (category_id ,location_id ,name ,description ,image) VALUES (? , ? , ?, ?, ?)',
       [item.category_id, item.location_id ,item.name ,item.description, item.image],
   );

    const resultHeader = InsertResult[0] as ResultSetHeader;
    const getNewResult = await mysqldb.getConnection().query(
        'SELECT * FROM items WHERE id = ?',
        [resultHeader.insertId]
    );
    const items = getNewResult[0] as Item[];
    return res.send(items[0]);
});

itemsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;


        const [relatedResults] = await mysqldb.getConnection().query(
            'SELECT COUNT(*) AS count FROM items WHERE id = ?',
            [id]
        );
        const relatedCount = (relatedResults as any)[0].count;

        if (relatedCount > 0) {
            return res.status(400).send({ error: 'он связанн  и не может быть удален' });
        }


        const [result] = await mysqldb.getConnection().query(
            'DELETE FROM items WHERE id = ?',
            [id]
        );

        if ((result as any).affectedRows === 0) {
            return res.status(404).send({ error: 'не найден' });
        }

        return res.send({ message: 'удален' });

});

export default itemsRouter

