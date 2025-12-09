const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger-output.json';

const doc = {
    info: {
        title: 'Xmas API',
        description: 'API con datos de navidad'
    },
    host: 'localhost:3000',
    schemas: ['http']
};

const endpointsFiles = [
    './src/app.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc)
.then(() => {
    require('./src/app.js');
});