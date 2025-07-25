const express = require('express');
const router = express.Router();

const { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword,
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController.js');

const { protect } = require('../middleware/authMiddleware.js');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
