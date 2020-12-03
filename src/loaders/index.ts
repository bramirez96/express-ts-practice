import express from 'express';
import expressLoader from './express';

export default async ({ expressApp }: MainLoader): Promise<void> => {
  await expressLoader({ server: expressApp });
  console.log('** Express server initialized **');
};

interface MainLoader {
  expressApp: express.Application;
}
