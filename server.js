require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const routes = require('./routes/routes');
const cors = require('cors');
const database = require('./utils/dbUtils');

const app = express();

const options = {
    origin: ['http://localhost:3001'],
}
app.use(cors(options));
app.use(express.json());

app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});
