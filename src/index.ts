import express from 'express';
import config from './config';
import loaders from './loaders';

const startServer = async (): Promise<void> => {
  const app = express();

  // Initialize Server: Middleware, Routes, Test Endpoints
  await loaders({ expressApp: app });

  // Start Server
  app
    .listen(config.port, () => {
      console.log(`** Server running on port ${config.port} **`);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit(1);
    });
};

startServer();
