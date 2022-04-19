const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Username exists!", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email exists!", status: false });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        
        await jwt.sign({ username: username }, process.env.SECRET, (err, token) => {
            return res.status(200).json({ jwt: token, status: true });
        });
    }
    catch (ex) {
        next(ex);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) 
            return res.json({ msg: "User not found!", status: false });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) 
            return res.json({ msg: "Username or password is incorrect!", status: false});
        
        await jwt.sign({ username: username }, process.env.SECRET, (err, token) => {
            return res.status(200).json({ jwt: token, status: true });
        });
    }
    catch (ex) {
        next(ex);
    }
}