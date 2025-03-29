const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, logoutUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Registration and login endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected endpoints for user profile management
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/logout', logoutUser);

module.exports = router;
