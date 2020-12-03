import { Router } from 'express';
import auth from './routes/auth';

export default (): Router => {
  const server = Router();

  auth(server);

  return server;
};
