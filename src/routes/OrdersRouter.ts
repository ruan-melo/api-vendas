import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from './middlewares/isAuthenticated';
const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      products: Joi.required(), //TODO Criar uma verificação adequada;
    },
  }),
  ordersController.create,
);

export default ordersRouter;
