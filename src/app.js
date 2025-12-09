const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const reindeers = [
    {
        id: 1,
        name:'Rudolf'
    },
    {
        id: 2,
        name:'Juank'
    },
    {
        id: 3,
        name:'Alfons'
    }
];

const app = express();
const PORT = 3000;

app.use(cors());

//- CREAR RUTA PARA VER LA DOCUMENTACIÓN
let swaggerDocument;
try{
    swaggerDocument = require('../swagger-output.json');
} catch {
    console.error('Swagger no ha generado aún. Vuelve a ejecutar el npm run start / dev');
}

if (swaggerDocument){
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

//* ------------- RUTAS -------------------------------------------


app.get('/', (req, res) => {
    res.send('<h1>API de Navidadas</h1>');
});

app.get('/algo', (req, res) => {
    res.send('<h1>API de algo</h1>');
});

app.get('/reindeers', (req, res) => {
    res.json(reindeers);
})

app.get('/reindeers/:id', (req, res) => {
    let id = req.params.id;
    res.json(reindeers.find(reindeers => reindeers.id == id));
})

app.listen(PORT, () => {
    console.log(`La API está escuchando en http://localhost:${PORT}`);
});