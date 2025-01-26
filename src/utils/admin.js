const User = require('../models/user.model');

async function ensureAdminUserExists() {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (!existingAdmin) {
      const adminUser = new User({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin',
      });

      await adminUser.save();
      // eslint-disable-next-line no-console
      console.log('Admin user created successfully.');
    } else {
      // eslint-disable-next-line no-console
      console.log('Admin user already exists.');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while ensuring admin user:', error.message);
  }
}

module.exports = ensureAdminUserExists;
