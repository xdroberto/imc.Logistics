require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/database');
const crypto = require('crypto');

const generateStandardPassword = () => {
  // Generar una contraseña segura pero manejable
  return crypto.randomBytes(4).toString('hex') + '@' + crypto.randomBytes(4).toString('hex');
};

const addAuthorizedUser = async (email, role) => {
  await connectDB();

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('Error: El usuario ya existe');
      return;
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
    
    console.log('=================================');
    console.log('Usuario autorizado creado exitosamente');
    console.log('=================================');
    console.log(`Email: ${email}`);
    console.log(`Rol: ${role}`);
    console.log(`Contraseña inicial: ${standardPassword}`);
    console.log('=================================');
    console.log('IMPORTANTE: Proporcione esta contraseña al usuario de forma segura.');
    console.log('El usuario deberá cambiar esta contraseña en su primer inicio de sesión.');
    
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

// Validación de argumentos
const [,, email, role] = process.argv;

if (!email || !role) {
  console.log('Uso: node addAuthorizedUser.js <email> <role>');
  console.log('Roles disponibles: admin, requester');
  process.exit(1);
}

if (!['admin', 'requester'].includes(role)) {
  console.log('Error: El rol debe ser "admin" o "requester"');
  process.exit(1);
}

// Validación básica del email
if (!email.includes('@')) {
  console.log('Error: Por favor proporcione un email válido');
  process.exit(1);
}

addAuthorizedUser(email, role);

