const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../models/db');
const app = express();
const bcrypt = require('bcrypt');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());




// Ruta de login con validación de hash
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE username = ?';

  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Error en login:', err);
      return res.status(500).send('Error del servidor');
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    const usuario = results[0];
    const contraseniaValida = await bcrypt.compare(password, usuario.password);

    if (contraseniaValida) {
      res.json({ success: true, token: 'token123', username });
    } else {
      res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).send('Error al obtener productos');
    res.json(results);
  });
});

// Insertar un producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio, descripcion } = req.body;
  const sql = 'INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)';
  db.query(sql, [nombre, precio, descripcion], (err, result) => {
    if (err) {
      console.error('Error al insertar producto:', err); // añade esto
      return res.status(500).send('Error al insertar producto: ' + err.message);
    }
    res.json({ id: result.insertId, nombre, precio, descripcion });
  });

});

// Actualizar producto
app.patch('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { precio } = req.body;
  const sql = 'UPDATE productos SET precio = ? WHERE id = ?';
  db.query(sql, [precio, id], (err, result) => {
    if (err) return res.status(500).send('Error al actualizar producto');
    res.send('Producto actualizado');
  });
});

// Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM productos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send('Error al eliminar producto');
    res.send('Producto eliminado');
  });
});

