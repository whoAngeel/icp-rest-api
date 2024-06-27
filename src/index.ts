import { Server } from 'azle';
import express from 'express';
// import PollRouter from './routes/poll.routes';
import ReportsRouter from './routes/report.route'

export default Server(() => {
  const app = express();
  app.use(express.json());
  // app.use(PollRouter);
  app.use('/reports', ReportsRouter)

  return app.listen();
});