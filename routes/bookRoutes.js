const router = require('express').Router();
const book = require('../controller/booksController');

router.get('/assign/:id', book.bookAssign);
router.get('/list', book.alocateBooks);
router.get('/delete/:id', book.deleteBook);

module.exports = router;