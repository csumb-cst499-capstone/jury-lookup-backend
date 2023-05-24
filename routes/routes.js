const express = require('express');

const router = express.Router()
const Juror = require("../models/juror");



//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

// Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const jurors = await Juror.find().limit(10);
        res.json(jurors);
        console.log(jurors.length);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;
