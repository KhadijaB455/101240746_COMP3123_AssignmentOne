const User = require('../models/User');
const jwt = require('jsonwebtoken'); //Added the optional package
const bcrypt = require('bcrypt');//Added to hide password


const secretKey = 'yourSecretKey'; 

//User is signup signing up
//http://localhost:3000/api/v1/user/signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// User is logging in using the same information as sign up
//http://localhost:3000/api/v1/user/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid Username and password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid Username and password' });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ status: true, username, message: 'User logged in successfully', jwt_token: token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
