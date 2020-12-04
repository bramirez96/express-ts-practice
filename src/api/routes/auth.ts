import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import AuthService from '../../services/auth';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { token, user } = await AuthService.signup(req.body);
        return res.status(201).json({ token, user });
      } catch (err) {
        console.log({ err });
        return next(err);
      }
    },
  );

  route.post(
    '/login',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const { token, user } = await AuthService.login(req.body);
        return res.status(200).json({ token, user });
      } catch (err) {
        console.log({ err });
        return next(err);
      }
    },
  );
};
