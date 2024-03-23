const router = require('express').Router();
const User = require('../models/User.model');
const isAuthenticated = require('../middlewaree/isAuthenticated');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});
router.put('/image', isAuthenticated, async (req, res, next) => {
  const { user } = req;
  const { image } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { image: image } },
      { new: true }
    );
    res.json({ updatedUser: updatedUser });
  } catch (err) {
    res.json({ error: 'error happened' });
  }
});

router.get('/users', isAuthenticated, async (req, res, next) => {
  const loggedIn = req.user;
  try {
    if (loggedIn) {
      const { password: _, ...userInfo } = loggedIn;
      res.json({ user: userInfo });
    } else {
      res.status(404).json({ error: 'user is nof fount' });
    }
  } catch (err) {
    res.json({ err: 'an errorr occured when retriving the user' });
  }
});

router.post('/upload', isAuthenticated, async (req, res, next) => {
  const { image } = req.body;
  const { username } = req.user;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { image: image },
      { new: true }
    );
    res.status(200).json({ message: 'File uploaded successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});
module.exports = router;
