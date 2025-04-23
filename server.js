const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Configurar transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lidarsolutionspatagonia@gmail.com',
    pass: 'budr adnr uudg itrg' // Reemplazalo por tu App Password
  }
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/solicitud', async (req, res) => {
  const { nombre, email, observaciones, poligono } = req.body;

  const mailOptions = {
    from: email,
    to: 'lidarsolutionspatagonia@gmail.com',
    subject: 'Nueva solicitud de escaneo LiDAR',
    text: `
🧍 Nombre: ${nombre}
📧 Email: ${email}
📝 Observaciones: ${observaciones}
📐 Polígono: ${poligono}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado correctamente.');
    res.status(200).json({ message: 'Correo enviado' });
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
