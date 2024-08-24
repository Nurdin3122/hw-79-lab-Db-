import express from 'express';
import itemsRouter from "./Routers/Items";
import cors from 'cors';
import mysqldb from "./MySqlDb";
import categoriesRouter from "./Routers/categories";


const app = express();
const port = 8039;
app.use(cors());


app.use(express.json());
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);




const run = async () => {
    try {
        await mysqldb.init();
        console.log('Connected');

        app.listen(port, () => {
            console.log(`Server started on ${port} port!`);
        });
    } catch (error) {
        console.error('Error connecting to the MySQL database:', error);
    }
};
run().catch(console.error);