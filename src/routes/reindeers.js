let { Router } = require('express');
let router = Router();

let reindeers = require('../../data/reindeers.json');


router.get('/', (req, res) => {
    res.json(reindeers);
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let reindeer = reindeers.find(reindeer => reindeer.id == id);
    if (reindeer) {
        res.json(reindeer);
    } else {
        res.status(400).json({ error: `No se encuentra el reno con id ${id}`});
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    reindeers = reindeers.filter(reindeer => reindeer.id != id);
    res.status(204).json({ msg: 'Elemento eliminado' });
})

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

module.exports = router;