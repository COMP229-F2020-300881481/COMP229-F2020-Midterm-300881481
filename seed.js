/**
 * File name: app.js
 * Student name: Shedrach Okonofua
 * Student ID: 300881481
 */
require('dotenv').config();
let mongoose = require('mongoose');
let faker = require('faker');
let DB = require('./server/config/db');
let Book = require('./server/models/book');

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB...');
});

const collect = (x) => (cb) => {
  const acc = [];
  for (let i = 0; i < x; i++) {
    acc.push(cb());
  }
  return acc;
};

const fakeBook = () => ({
  name: faker.commerce.productName(),
  author: faker.name.findName(),
  published: faker.random.number({ min: 1900, max: 2021 }),
  description: faker.lorem.sentence(),
  price: faker.random.number({ min: 5, max: 30 })
});

async function seed() {
  await mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
  await Book.deleteMany({});
  await Book.insertMany(collect(20)(fakeBook));
  mongoose.connection.close();
}

seed()