const express = require('express');
const router = express.Router()
const Juror = require("../models/juror_model");
const juror_controller = require('../controllers/juror_controller');
//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

// Get all Method
router.get('/getAll', juror_controller.juror_getAll);

//Get by ID Method
router.get('/getOne/:id', juror_controller.juror_getOne);




router.get('/hello', (req, res) => {
    // send back a JSON response
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ "message": "Hello, World!" });
});
module.exports = router;