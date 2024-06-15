import { Server } from 'azle';
import express from 'express';
import PollRouter from './routes/poll.routes';

export default Server(() => {
  const app = express();
  app.use(express.json());
  app.use(PollRouter);

  return app.listen();
});