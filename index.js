import "dotenv/config.js";
import express from 'express';
import { PostgresHelper } from './src/db/postgres/helper.js';


const app = express();


app.use(express.json());


app.get('/', async (req, res) => {
  try {
    const users = await PostgresHelper.query('SELECT * FROM users;');
    res.json(users); 
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).send('Erro no servidor');
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
