const bcrypt = require('bcrypt');
const User = require("../models/UserModel");

exports.user_register = async function (req, res) {
  const { username, password } = req.body;

  try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
          return res.status(400).json({ message: 'User with this username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res.json({ message: 'User has been successfully created' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred when creating a user' });
  }
};

exports.user_login = async function (req, res) {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid username or password' });
      }

      res.json({ message: 'Login successful' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'A user login error occurred' });
  }
};
