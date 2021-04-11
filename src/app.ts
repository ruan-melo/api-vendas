import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

process.title = "api-vendas"

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
