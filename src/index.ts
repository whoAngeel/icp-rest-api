import { Server } from 'azle';
import express from 'express';
// import PollRouter from './routes/poll.routes';
import ReportsRouter from './routes/report.route'
import UsersRouter from './routes/user.route'

export default Server(() => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({extended: false}))
  // app.use(PollRouter);
  app.use('/reports', ReportsRouter)
  app.use('/users', UsersRouter)

  return app.listen();
});