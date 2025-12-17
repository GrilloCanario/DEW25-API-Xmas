const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Crear la ruta para ver la documentación.
let swaggerDocument;
try {
    swaggerDocument = require('../swagger-output.json');
} catch {
    console.error('Swagger no generado aún. Vuelve a ejecutar npm run start o dev');
}

if (swaggerDocument) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

//----------RUTAS--------------------//
app.get('/', (req, res) => {
    res.send('<h1>API de Navidad</h1>');
});

app.get('/algo', (req, res) => {
    res.send('<h1>Esto es algo</h1>');
});

//* Las rutas de los renos están en el archivo router/reindeers.js
app.use('/reindeers', require('./routes/reindeers.js'))

app.listen(PORT, () => {
    console.log(`La API está escuchando en http://localhost:${PORT}`);
});