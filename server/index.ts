import express, {
  json,
} from 'express';
import 'dotenv/config';
import './utils/mongoose';
import {
  CardRouter,
} from './routers';

const app = express();

const port = process.env.NODE_DOCKER_PORT;

app.use(json());

app.get('/', function (_req, res) {
  res.send('Hello World!');
});

app.use('/api', CardRouter);

app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
})