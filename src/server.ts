import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const address = '0.0.0.0:3000' as string;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
