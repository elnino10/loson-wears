/* eslint-disable no-undef */
import fs from'fs';
import mongoose from'mongoose';
import dotenv from 'dotenv';
import config from '../config.js';

import Product from '../models/productModel.js';
// const User = require('../../models/userModel.js');
// const Review = require('../../models/reviewModel.js');

dotenv.config();

const mongodbUrl = config.MONGODB_URL.replace('<password>', config.DATABASE_PASSWORD);
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected.....");
  });

//   READ JSON FILE
const products = JSON.parse(fs.readFileSync('./backend/dev-data/productData.json', 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

//   IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Product.create(products);
    // await User.create(users, {validateBeforeSave: false});
    // await Review.create(reviews);
    console.log('data loaded!!!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log('data deleted successfully!!!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// TAKE ACTIONS FROM COMMAND LINE
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') { 
  deleteData();
}
