const db = require("../../_helpers/db");
const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = db.User

module.exports = {
  userList,
  addUser,
  userById,
  userUpdate,
  userDelete,


  getById

}

// -------USER------------

//  user list
async function userList(req, res) {
  console.log("userList", req.body)

  const data = await user.find({}).sort({ _id: -1 });

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// Add user
async function addUser(req, res) {
  console.log("addUser", req.body)

  if (await user.findOne({ email: req.body.email })) {
    return res.status(200).json({
      message: "Email " + req.body.email + " is already taken",
      status: "0",
    });
  }

  const Userdata = new user({
    full_name: req.body.full_name,
    email: req.body.email.toLowerCase()
  });

  const Users = new user(Userdata);
  // hash password
  if (req.body.password) {
    Users.password = bcrypt.hashSync(req.body.password, 10);
  }
  //   JWT token
  const payload = {
    full_name: req.body.full_name,
    email: req.body.email.toLowerCase()
  }
  const token = jwt.sign(payload, config.secret, {
    expiresIn: "365d",
  });
  console.log("token", token)
  Users.token = token
  // save user
  await Users.save();

  return res.status(200).json({
    messgae: "success",
    status: "1"
  })
}

// user by id
async function userById(req, res) {
  console.log("UserById", req.body)

  const data = await user.findOne({ _id: req.body.id })

  return res.status(200).json({
    data: data,
    messgae: "success",
    status: "1"
  })
}

// user Update
async function userUpdate(req, res) {
  console.log("userUpdate", req.body)

  await user.updateOne({ _id: req.body.id },
    {
      full_name: req.body.full_name,
      email: req.body.email.toLowerCase(),
      updated_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}

// user Delete
async function userDelete(req, res) {
  console.log("userDelete", req.body)

  await db.User.updateOne({ _id: req.body.id },
    {
      status: "Inactive",
      deleted_at: new Date()
    }, function (err, result) {
      if (result) {
        return res.status(200).json({
          message: "success",
          status: "1",
        });
      } else {
        return res.status(200).json({
          message: "Error",
          status: "0",
        });
      }
    }
  )
}



async function getById(id) {
  return await user.findById(id);
}