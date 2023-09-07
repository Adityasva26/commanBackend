const db = require("../../_helpers/db");
const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = db.User


module.exports = {
    login,
}


// Login Api
async function login(req, res) {
    console.log("login", req.body)

    if (req.body.email == "") {
        return res.status(200).json({
            message: language.Email_is_Required,
            status: "0",
        });
    }

    if (req.body.password == "") {
        return res.status(200).json({
            message: language.Password_is_Required,
            status: "0",
        });
    }

    const user = await User.findOne({ email: req.body.email.toLowerCase(), status: "Active" });
    if (!user) {
        return res.status(200).json({ message: "User Not found", status: "0" });
    }

    if (!user) {
        res.status(200).json({ message: "User Not found", status: "0" });
    } else {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ sub: user.id }, config.secret, {
                expiresIn: "365d",
            });
            db.User.updateOne(
                { _id: user.id },
                {
                    $set: {
                        token: token,
                    },
                },
                async function (err, result) {
                    if (result) {
                        const Users = await User.findOne({ email: req.body.email });
                        Userdata = {
                            full_name: Users?.full_name,
                            email: Users?.email,
                            role: Users?.role_id,
                            created_at: Users?.created_at,
                            token:Users?.token,
                            id: Users?._id,
                        };

                        console.log("Userdata", Userdata);
                        res.status(200).json({
                            message: "Success",
                            data: Userdata,
                            status: "1",
                        });
                    } else {
                        res.status(200).json({ message: "User Not Login", status: "0" });
                    }
                }
            );
        } else {
            res
                .status(200)
                .json({ message: "Invalid Email & Password", status: "0" });
        }
    }

}

