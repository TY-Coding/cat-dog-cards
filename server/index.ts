import express, {
  json,
} from 'express';

const app = express();

const port = process.env.NODE_DOCKER_PORT || 3000;

app.use(json());

app.get('/', function(_req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('Listening on port 3000...');
})