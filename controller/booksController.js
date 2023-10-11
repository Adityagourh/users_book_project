const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Book = require('../model/booksModel');
module.exports = {
  //Create user 
  bookAssign: async (req, res) => {
    try {
      let userId = await req.params.id;
      userId = await parseInt(userId);
      let {title, auther}= await req.body; 
      let isBook = await Book.query().findOne({ title: title });
      if (isBook) {
        return res.status(401).json({
          success: false,
          message: "Book already allocate this name"
        })
      }
      let data = await Book.query().insert({
        title: title,
        auther:auther,
        user_id:userId
      });
      res.status(201).json({
        success: true,
        Bookdetails: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
  
  //Delete Book
  deleteBook: async (req, res) => {
    try {
      const bbokId= await req.params.id;
      const user =await Book.query().deleteById(bbokId);
      if(user){
        res.status(203).json({
          success: true,
          message: "Book delete successfully",
          User: user,
        });  
      }else
      res.status(401).json({
        success: false,
        message: "Unable to delete for this id",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //Books list
  alocateBooks: async (req, res) => {
    try {
      let bookList = await Book.query().from('books');
      res.status(200).json({
        success: true,
        BookList: bookList,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
