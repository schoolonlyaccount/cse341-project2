const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Video Games & Developer API',
        description: 'A RESTful API for managing and retrieving information about video games and their developers.'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);