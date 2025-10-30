const User = require('../models/User');
const bcrypt = require('bcrypt');

const createAdminUser = async () => {
  try {
    const ADMIN_NAME = process.env.ADMIN_NAME;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    const adminExists = await User.findOne({ email: ADMIN_EMAIL });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);
      
      await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'Admin'
      });
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

module.exports = createAdminUser;