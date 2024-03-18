const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res, next) => {
  const { username, password, campus, course } = req.body;
  if (!username || !password || !campus || !course) {
    res.json({ error: 'all fields are required' });
    return;
  }
  // Check if user already exists in the database
  try {
    const findUser = await User.findOne({ username });
    if (findUser) {
      res.json({ error: 'this user has already signed up to the platform' });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      username,
      password: hashedPassword,
      campus,
      course,
    });
    res.json({ userinfo: createdUser });
  } catch (error) {
    res.json({ error: 'an error occurred while signing up' });
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!password || !username) {
    res.json({ message: ' both fields are required' });
  }
  try {
    const findUser = await User.findOne({ username });
    const hashedPassword = findUser.password;
    if (bcrypt.compare(password, hashedPassword)) {
      res.json({ message: 'sucessfully signed' });
    }
  } catch (error) {
    res.json({ error: 'an error occurred while you are trying to login' });
  }
});

module.exports = router;
