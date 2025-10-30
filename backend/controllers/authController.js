const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const { name, email, password } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ message: 'Email already in use' });
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    
    const user = await User.findOne({ email });
    
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = { 
      id: user._id, 
      name: user.name,
      email: user.email,
      role: user.role 
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });

    return res.json({ 
      message: 'Login successful', 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      } 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.logout = async (req, res) => {
  try {
    req.user = null;

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      shouldClearToken: true
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error.message
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({ 
      name, 
      email, 
      password: hashed,
      role: 'Recruiter'
    });
    await user.save();

    return res.status(201).json({ 
      message: 'User registered', 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      } 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
