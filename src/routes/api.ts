import { Router } from 'express';
import userRouter from './user-router';
import formRouter from './form-router';
import formDefRouter from './form-def-router';




// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/forms/definitions', formDefRouter);
baseRouter.use('/forms', formRouter);

// Export default.
export default baseRouter;
