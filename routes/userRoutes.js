const express = require('express');
const user = require('../controller/userController');
const passport = require('passport');
const router = express.Router();
const {registerUserValidation ,loginUserValidation} = require('../validation/userDataValidation')

router.post('/create',registerUserValidation,user.createUser);
router.get('/login',loginUserValidation, user.loginUser);
router.get('/list', user.getUsers);
router.get('/deleteone/:id',user.deleteUser);
router.get('/auth',passport.authenticate('jwt',{session:false}),user.jwtAuthontication);

module.exports = router;
