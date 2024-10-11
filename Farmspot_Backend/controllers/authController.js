const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.signup = async (req, res) => {
  try {
    const { username, email, password , role} = req.body;
    console.log('signing user up.......')
    console.log(password);
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, email, password: hashedPassword, role});
    res.status(201).json({ message: 'User created!', userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      { expiresIn: '1h' }
    );

    res.status(200).json({token: token, username: user.username, id: user.id, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
