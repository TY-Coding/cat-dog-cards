import express, {
  json,
} from 'express';
import {
  renderFile,
} from 'ejs';
import 'dotenv/config';
import cors from 'cors';
import './utils/mongoose';
import {
  CardRouter,
} from './routers';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_PORT,
}));

const port = process.env.NODE_DOCKER_PORT;

app.use(json());
app.use(express.static(__dirname + '/../apidoc'));
app.set('views', __dirname + '/../apidoc');
app.engine('html', renderFile);

app.get('/', function (_req, res) {
  res.send('Hello World!');
});

app.get('/apidoc', async (_req, res) => {
  res.render('index.html');
});

app.use('/api', CardRouter);

app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
})