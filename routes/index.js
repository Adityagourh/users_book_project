  const mainRouter = require('express').Router();
  const userRouter = require('./userRoutes');
  const bookRouter = require('./bookRoutes');
  
  mainRouter.use('/user', userRouter);
  mainRouter.use('/book', bookRouter);
   
  module.exports = mainRouter;
