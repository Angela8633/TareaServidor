
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); 

const app = express();
const port = 3000;


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


let contactos = [];


app.get('/contactos', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
});


app.post('/contactos', (req, res) => {
  const { nombre, telefono } = req.body;

  if (!nombre || !telefono) {
    return res.status(400).json({ error: 'Nombre y teléfono son requeridos' });
  }

  const nuevoContacto = { nombre, telefono };
  contactos.push(nuevoContacto);

  res.status(201).json(nuevoContacto);
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

