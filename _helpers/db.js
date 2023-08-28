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
    Product: require("../futurePedia/models/product.model"),
    Favourites: require("../futurePedia/models/Favourites.model"),
    News: require("../futurePedia/models/news.model"),
    User: require("../futurePedia/models/user.model"),
    Category: require("../futurePedia/models/category.model"),
    Feature: require("../futurePedia/models/Feature.model"),
    Pricing: require("../futurePedia/models/pricing.model"),
    Blog: require("../futurePedia/models/blog.model"),
    Comment: require("../futurePedia/models/comment.model"),

};