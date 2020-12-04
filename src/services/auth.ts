import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IUser } from '../interfaces/user';
import User from '../models/user';

export default {
  login: async ({
    email,
    password,
  }: Pick<IUser, 'email' | 'password'>): Promise<AuthReturn> => {
    const foundUser = await User.findOne({ email });

    const isValidPassword = await argon2.verify(foundUser.password, password);
    if (!isValidPassword) {
      throw createError(401, 'Invalid password');
    }

    const token = generateToken(foundUser);
    const user = cleanUser(foundUser);

    return { user, token };
  },
  signup: async (newUser: Omit<IUser, 'salt' | 'id'>): Promise<AuthReturn> => {
    const salt = randomBytes(32);

    const hashedPassword = await argon2.hash(newUser.password, {
      salt,
      hashLength: 128,
    });
    const createdUser = await User.create({
      ...newUser,
      salt: salt.toString('hex'),
      password: hashedPassword,
    });

    if (!createdUser) {
      throw createError('Could not create user');
    }

    const token = generateToken(createdUser);
    const user = cleanUser(createdUser);

    // TODO If we've reached this point, dispatch a signup event!

    return { user, token };
  },
};

const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    config.jwtSecret,
    {
      expiresIn: '24h',
    },
  );
};

const cleanUser = (user: IUser): Omit<IUser, 'salt' | 'password'> => {
  Reflect.deleteProperty(user, 'salt');
  Reflect.deleteProperty(user, 'password');
  return user;
};

interface AuthReturn {
  token: string;
  user: Omit<IUser, 'salt' | 'password'>;
}
