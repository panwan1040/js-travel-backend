const express = require('express');
const router = express.Router();
const { Sequelize, sequelize } = require('../db');
const { Attraction } = require('../model/attractions');

// get all
router.get('/attractions', (req, res) => {
    Attraction.findAll().then(attraction => {
        res.json(attraction);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//route get by id
router.get('/attraction/:id', (req, res) => {
    Attraction.findByPk(req.params.id).then(attraction => {
        if (!attraction) {
            res.status(404).send('attraction not found');
        } else {
            res.json(attraction);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to create new
router.post('/attraction/create', (req, res) => {
    Attraction.create(req.body).then(attraction => {
        res.send(attraction);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//update
router.put('/attraction/update/:id', (req, res) => {
    Attraction.findByPk(req.params.id).then(attraction => {
        if (!attraction) {
            res.status(404).send('attraction not found');
        } else {
            attraction.update(req.body).then(() => {
                res.send(attraction);
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});


router.delete('/attraction/delete/:id', (req, res) => {
    Attraction.findByPk(req.params.id).then(attraction => {
        if (!attraction) {
            return res.status(404).send('attraction not found');
        } else {
            attraction.destroy().then(() => {
                return res.send(`Deleted attraction with id: ${req.params.id}`);
            }).catch(err => {
                if (err.name === 'SequelizeForeignKeyConstraintError') {
                    return res.status(400).send('Cannot delete attraction because it is being referenced by another table');
                }
                return res.status(500).send(err.message);
            });
        }
    }).catch(err => {
        return res.status(500).send(err.message);
    });
});

module.exports = router;