import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

const route = Router();

export default (app: Router): void => {
  app.use('/auth', route);

  route.post(
    '/login',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    (req, res) => {
      res.status(200).json('hi');
    },
  );
};
