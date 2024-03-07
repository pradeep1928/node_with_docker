const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashPassword,
        });
        if (!newUser)
            return res
                .status(401)
                .json({ status: "Failed", message: "Error creating new user" });
        else {
            req.session.user = newUser;
            console.log(`New User ${newUser._id} created`);
            return res.status(201).json({
                status: "Success",
                message: "New User created successfully",
                data: { user: newUser },
            });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .json({ status: "Failed", message: "Error in creating new user." });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }
        const user = await User.findOne({ email })

        if (!user)
            return res
                .status(401)
                .json({ status: "Fail", message: "Invalid email or Credentials!" });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res
                .status(401)
                .json({ status: "Fail", message: "Invalid Password!" });
        } else {
            req.session.user = user
            res.status(200)
                .json({ status: "Success", message: "User logged in successfully" });
        }

    } catch (error) {
        console.error(error.message);
        return res
            .status(500)
            .json({ status: "Failed", message: "Error in login." });
    }
};

module.exports = {
    signUp,
    login
};
