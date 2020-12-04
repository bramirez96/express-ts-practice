import createError from 'http-errors';
import { IUser } from '../interfaces/user';
import db from './data';

export default {
  findOne: async (filter: Partial<IUser>): Promise<IUser> => {
    const userRecord = await db('users').where(filter);
    if (userRecord.length <= 0) {
      throw createError(404, 'User not found');
    } else if (userRecord.length > 1) {
      throw createError(400, 'Found more than one user');
    }
    return userRecord[0];
  },
  create: async (newUserInfo: Omit<IUser, 'id'>): Promise<IUser> => {
    try {
      const createdUser = await db('users').insert(newUserInfo).returning('*');
      return createdUser[0];
    } catch (err) {
      console.log({ err });
      if (err.message.includes('violates unique constraint')) {
        throw createError(409, 'User already exists');
      }
      throw new Error(err);
    }
  },
};
