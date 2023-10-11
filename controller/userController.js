const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../model/userModel');
module.exports = {
  //Create user 
  createUser: async (req, res) => {
    try {
      let {name, email, password}= await req.body; 
      let isUserExist = await User.query().findOne({ email: req.body.email });
      if (isUserExist) {
        return res.status(401).json({
          success: false,
          message: "User already register"
        })
      }
      let salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(password, salt);
      let data = await User.query().insert({
        name:name,
        email:email,
        password: hashPassword
      });
      data.password = hashPassword;
      res.status(201).json({
        success: true,
        Data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //Login user
  loginUser: async (req, res) => {
    try {
      const user = await User.query().findOne({ email: req.body.email }).first();
      if (user) {
        const hashPassword = await bcrypt.compare(req.body.password, user.password);
        if (user && hashPassword) {
           let token = jwt.sign({ id:user.id }, process.env.SECRET_KEY, { expiresIn: "2h" });
          res.status(200).json({
            success: true,
            user: user,
             token: token
          })
        } else {
          res.status(401).send({
            success: false,
            message: "Wrong email or password",
          });

        }
      } else {
        res.status(401).send({
          success: false,
          message: "User is not register with this email",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
    
  //delete user 
  deleteUser: async (req, res) => {
    try {
      const userId= await req.params.id;
      const user =await User.query().deleteById(userId);
      if(user){
        res.status(203).json({
          success: true,
          message: "User delete successfully",
          User: user,
        });  
      }else
      res.status(401).json({
        success: false,
        message: "Unable to delete",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //User list
  getUsers: async (req, res) => {
    try {
          const users = await User.query()
            .from('users')
            .withGraphFetched('books')
            .select('id', 'name', 'email')
            .modifyGraph('books', (builder) => {
              builder.select('id', 'title', 'auther');
            });
      res.status(200).json({
        success: true,
        Data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //Authentication
  jwtAuthontication: async (req, res) => {
    try {
      let user = await req.user;
      if(user){
        res.status(200).json({
          success: true,
          Data: req.user,
        });
      }else{
        res.status(400).json({
          success: false,
          message:"Invalid token"
        })
      }
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
