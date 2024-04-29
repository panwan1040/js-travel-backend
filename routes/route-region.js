const express = require('express');
const router = express.Router();
const { Sequelize, sequelize } = require('../db');
const { Region } = require('../model/regions');

// get all
router.get('/regions', (req, res) => {
    Region.findAll().then(region => {
        res.json(region);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//route get by id
router.get('/region/:id', (req, res) => {
    Region.findByPk(req.params.id).then(region => {
        if (!region) {
            res.status(404).send('region not found');
        } else {
            res.json(region);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to create new
router.post('/region/create', (req, res) => {
    Region.create(req.body).then(region => {
        res.send(region);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//update
router.put('/region/update/:id', (req, res) => {
    Region.findByPk(req.params.id).then(region => {
        if (!region) {
            res.status(404).send('region not found');
        } else {
            region.update(req.body).then(() => {
                res.send(region);
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});


router.delete('/region/delete/:id', (req, res) => {
    Region.findByPk(req.params.id).then(region => {
        if (!region) {
            return res.status(404).send('region not found');
        } else {
            region.destroy().then(() => {
                return res.send(`Deleted region with id: ${req.params.id}`);
            }).catch(err => {
                if (err.name === 'SequelizeForeignKeyConstraintError') {
                    return res.status(400).send('Cannot delete region because it is being referenced by another table');
                }
                return res.status(500).send(err.message);
            });
        }
    }).catch(err => {
        return res.status(500).send(err.message);
    });
});

module.exports = router;