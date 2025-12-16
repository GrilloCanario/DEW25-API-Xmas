const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

let reindeers = [
    {
        id: 1,
        name: 'Rudolf'
    },
    {
        id: 2,
        name: 'Juank'
    },
    {
        id: 3,
        name: 'Alfonso'
    }
];

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

app.get('/reindeers', (req, res) => {
    res.json(reindeers);
})

app.get('/reindeers/:id', (req, res) => {
    let id = req.params.id;
    let reindeer = reindeers.find(reindeer => reindeer.id == id);
    if (reindeer) {
        res.json(reindeer);
    } else {
        res.status(400).json({ error: `No se encuentra el reno con id ${id}`});
    }
})

app.delete('/reindeers/:id', (req, res) => {
    let id = req.params.id;
    reindeers = reindeers.filter(reindeer => reindeer.id != id);
    res.status(204).json({ msg: 'Elemento eliminado' });
})

app.post('/reindeers', (req, res) => {
    console.log('body:', req.body)
    const newReindeer = req.body;
    console.log('longitud:', newReindeer.name.length);
    if (newReindeer.name.length > 0) {
        let maximo = Math.max(...reindeers.map(r => r.id), 0); //- En caso de que no haya reno cuando se añada nuevos empiece desde 0 porque sino sera null y null+1 = null
        newReindeer.id = maximo + 1;
        reindeers.push(newReindeer);
        res.status(201).json(newReindeer);
    } else {
        res.status(400).json({ error: 'Server dice que el nombre está vacío' });
    }
})

app.put('/reindeers/:id', (req, res) => {
    let id = req.params.id;
    const existReindeer = req.body.name;
    let reindeer = reindeers.find(r => r.id == id);
    
    if(reindeer) {
        reindeer.name =existReindeer;
        res.status(200).json(reindeer);
    } else {
        res.status(400).json({error: 'No existe este reno'})
    }
    if(reindeer == 0){
        res.status(400).json({error: 'El nombre no puede ser vacio'})
    }
    
    console.log(reindeer);
    //reindeer.name = req.body.name;
    
});

app.listen(PORT, () => {
    console.log(`La API está escuchando en http://localhost:${PORT}`);
});