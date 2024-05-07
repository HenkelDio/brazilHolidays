import express from 'express';
import { router } from './routes';
import bodyParser from 'body-parser';
import { auth } from './auth';
import 'dotenv/config'

const app = express();

const PORT = "3000";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('*', auth);
app.use(router);

app.listen(PORT, () => console.log("ouvindo porta 3000"))