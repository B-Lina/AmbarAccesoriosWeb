const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lina0610',
    database: 'tienda_accesorios'
});

// Ruta para obtener productos filtrados
app.get('/api/productos', (req, res) => {
    const { precioRange } = req.query; // Obtén el filtro de precio
    console.log("Filtro de precio recibido:", precioRange);

    let sql = 'SELECT * FROM productos WHERE 1=1'; // Consulta básica que selecciona todos los productos
    const params = [];

    // Verificar si hay un filtro de precio
    if (precioRange) {
        switch (precioRange) {
            case '0-15000':
                sql += ' AND precio BETWEEN 0 AND 15000';
                break;
            case '16000-19000':
                sql += ' AND precio BETWEEN 16000 AND 19000';
                break;
            case '20000-29000':
                sql += ' AND precio BETWEEN 20000 AND 29000';
                break;
            case '30000+':
                sql += ' AND precio >= 30000';
                break;
            default:
                break;
        }
    }

    console.log("Consulta SQL generada:", sql); // Verifica la consulta SQL antes de ejecutarla

    // Ejecutar la consulta con la conexión a la base de datos
    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(results);  // Devuelve los productos filtrados
        }
    });
});

// Ruta para manejar la búsqueda de productos
app.get('/api/buscar-productos', (req, res) => {
    const { query } = req.query; // Obtener el término de búsqueda

    if (!query) {
        return res.status(400).send('Se requiere un término de búsqueda.');
    }

    // Consulta SQL para buscar productos que contengan el término de búsqueda en su nombre
    const sql = 'SELECT * FROM productos WHERE nombre LIKE ?';
    const params = [`%${query}%`];  // El % en la consulta permite buscar cualquier coincidencia

    // Ejecutar la consulta en la base de datos
    connection.query(sql, params, (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
        } else {
            res.json(results); // Devolver los productos que coinciden con la búsqueda
        }
    });
});

// Ruta para manejar el login
app.post('/api/login', (req, res) => {
    const { username, password, userType } = req.body;

    // Validar que se recibieron los datos
    if (!username || !password || !userType) {
        return res.status(400).send({ message: 'Faltan datos en la solicitud.' });
    }

    // Consultar el usuario en la base de datos según el tipo de usuario
    let query = 'SELECT * FROM usuarios WHERE email = ?';
    
    if (userType === 'administrativo') {
        query = 'SELECT * FROM empleados WHERE email = ?'; // Asegúrate de que tienes un campo `email` en `empleados`
    }

    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la base de datos.' });
        }

        if (results.length === 0) {
            return res.status(401).send({ message: 'Usuario no encontrado.' });
        }

        const user = results[0];

        // Comparar la contraseña proporcionada con la contraseña en la base de datos
        bcrypt.compare(password, user.contrasena, (err, match) => {
            if (err) {
                return res.status(500).send({ message: 'Error al verificar la contraseña.' });
            }

            if (!match) {
                return res.status(401).send({ message: 'Contraseña incorrecta.' });
            }

            // Si las credenciales son correctas, enviar respuesta positiva
            res.status(200).send({
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email,
                    tipo: userType
                }
            });
        });
    });
});

// Ruta principal para servir la página después de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });



// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
