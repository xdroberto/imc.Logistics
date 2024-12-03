const User = require('../models/User');
const crypto = require('crypto');

const generateStandardPassword = () => {
  return crypto.randomBytes(4).toString('hex') + '@' + crypto.randomBytes(4).toString('hex');
};

const addAuthorizedUser = async (email, role) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Usuario ya existe:', email);
      return null;
    }

    const standardPassword = generateStandardPassword();
    const user = new User({ 
      email, 
      password: standardPassword, 
      role,
      isAuthorized: true,
      isPasswordChanged: false
    });
    
    await user.save();
    
    console.log('Usuario autorizado creado:', email);
    console.log('Contraseña inicial:', standardPassword);
    
    return { email, password: standardPassword, role };
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    return null;
  }
};

module.exports = { addAuthorizedUser };

