const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = user.generateAuthToken();
    res.json({ 
      token, 
      role: user.role, 
      isPasswordChanged: user.isPasswordChanged,
      message: user.isPasswordChanged ? 'Inicio de sesión exitoso' : 'Por favor, cambie su contraseña'
    });
  } catch (err) {
    res.status(400).json({ msg: 'Credenciales inválidas' });
  }
});

// Cambio de contraseña
router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña actual incorrecta' });
    }

    user.password = newPassword;
    user.isPasswordChanged = true;
    await user.save();

    res.json({ msg: 'Contraseña cambiada exitosamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al cambiar la contraseña' });
  }
});

module.exports = router;

