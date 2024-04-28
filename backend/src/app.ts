const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(morgan('combined'));
app.use(helmet());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Hello world!");
});
  
app.listen(8000);