const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de la base de datos
const db = mysql.createConnection({
  host: '127.0.0.1',        // Cambia si es necesario
  port: 3306,               // Puerto predeterminado de MySQL
  user: 'root',             // Reemplaza con tu usuario de MySQL
  password: '',             // Reemplaza con tu contraseña de MySQL
  database: 'mi_api_db'     // Nombre de la base de datos creada
});

// Conexión a la base de datos
db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para insertar datos
app.post('/api/datos', (req, res) => {
  const { nombre, valor } = req.body;
  const sql = 'INSERT INTO datos (nombre, valor) VALUES (?, ?)';
  
  db.query(sql, [nombre, valor], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ id: result.insertId, nombre, valor });
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
