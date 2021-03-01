let mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
  name: String,
  author: String,
  published: Date,
  description: String,
  price: Number
});

module.exports = mongoose.model('Book', bookModel);