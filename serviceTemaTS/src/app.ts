import express from 'express';
import { setInitialMiddlewares } from './middlewares/app/setInitialMiddlewares';
import { setRoutes } from './middlewares/app/setRoutes';
import { setErrorHandler } from './middlewares/app/setErrorHandler';

const app = express()

setInitialMiddlewares(app)
setRoutes(app)
setErrorHandler(app)

export default app