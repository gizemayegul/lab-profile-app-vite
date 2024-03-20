const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const isAuthenticated = require('../middlewaree/isAuthenticated');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res, next) => {
  const { username, password, campus, course } = req.body;
  if (!username || !password || !campus || !course) {
    res.status(400).json({ error: 'all fields are required' });
    return;
  }
  // Check if user already exists in the database
  try {
    const findUser = await User.findOne({ username });
    if (findUser) {
      res
        .status(400)
        .json({ error: 'this user has already signed up to the platform' });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      username,
      password: hashedPassword,
      campus,
      course,
      image: '',
    });
    const { password: _, ...userInfo } = createdUser.toObject();
    res.json({ userinfo: userInfo });
  } catch (error) {
    res.status(500).json({ error: 'an error occurred while signing up' });
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!password || !username) {
    res.json({ error: ' both fields are required' });
  }
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      res.status(401).json({
        error: 'the user is not registered please go to sign up page',
      });
      return;
    }
    const hashedPassword = findUser.password;
    const isMatchedPassword = await bcrypt.compare(password, hashedPassword);
    if (!isMatchedPassword) {
      res.status(401).json({ error: 'the info is not correct' });
      return;
    }
    const { password: _, __v, ...payload } = findUser.toObject();
    // create payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '6h',
    });
    res.status(201).json({ token: token, payload: payload });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'an error occurred while you are trying to login' });
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
