const mongoose = require('mongoose');

const config = require('../config.json');

try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.set("strictQuery", false);
    mongoose.connect(config.connectionString, options)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.log('MongoDB connection error: ', err);
    });
        
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
module.exports = {
    Product: require("../src/models/product.model"),
    Favourites: require("../src/models/Favourites.model"),
    News: require("../src/models/news.model"),
    User: require("../src/models/user.model"),
    Category: require("../src/models/category.model"),
    Feature: require("../src/models/Feature.model"),
    Pricing: require("../src/models/pricing.model"),
    Blog: require("../src/models/blog.model"),
    Comment: require("../src/models/comment.model"),

};