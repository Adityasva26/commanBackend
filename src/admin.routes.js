const express = require("express");
const router = express.Router();
const path = require("path");
const {uploadPhoto} = require('../src/middleware/uploadPhoto');
const adminController = require("../src/controllers/Admin.controller");
const userController = require("../src/controllers/User.controller")

// ------ADMIN----------

// ----adminuser--------
router.post("/addUser",addUser);
router.get("/userList",userList);
router.post("/userById",userById);
router.post("/userUpdate",userUpdate);
router.post("/userDelete",userDelete)


router.post("/login",login)

module.exports = router;




// ------ADMIN----------

// ----adminuser--------
function addUser(req, res,next){
  adminController
    .addUser(req, res)
    .then((data) => console.log("addUser"))
    .catch((err) => next(err));
}
function userList(req, res,next){
  adminController
    .userList(req, res)
    .then((data) => console.log("userList"))
    .catch((err) => next(err));
}
function userById(req, res,next){
  adminController
    .userById(req, res)
    .then((data) => console.log("userById"))
    .catch((err) => next(err));}
function userUpdate(req, res,next){
  adminController
    .userUpdate(req, res)
    .then((data) => console.log("userUpdate"))
    .catch((err) => next(err));
}
function userDelete(req, res,next){
  adminController
    .userDelete(req, res)
    .then((data) => console.log("userDelete"))
    .catch((err) => next(err));
}
function userDelete(req, res,next){
  adminController
    .userDelete(req, res)
    .then((data) => console.log("userDelete"))
    .catch((err) => next(err));
}

function login(req, res,next){
  userController
    .login(req, res)
    .then((data) => console.log("login"))
    .catch((err) => next(err));
}
