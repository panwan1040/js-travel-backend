const express = require('express');
const router = express.Router();
const { Sequelize, sequelize } = require('../db');
const { Province } = require('../model/provinces');

// get all
router.get('/provinces', (req, res) => {
    Province.findAll().then(province => {
        res.json(province);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//route get by id
router.get('/province/:id', (req, res) => {
    Province.findByPk(req.params.id).then(province => {
        if (!province) {
            res.status(404).send('province not found');
        } else {
            res.json(province);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// route to create new
router.post('/province/create', (req, res) => {
    Province.create(req.body).then(province => {
        res.send(province);
    }).catch(err => {
        res.status(500).send(err);
    });
});

//update
router.put('/province/update/:id', (req, res) => {
    Province.findByPk(req.params.id).then(province => {
        if (!province) {
            res.status(404).send('province not found');
        } else {
            province.update(req.body).then(() => {
                res.send(province);
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});


router.delete('/province/delete/:id', (req, res) => {
    Province.findByPk(req.params.id).then(province => {
        if (!province) {
            return res.status(404).send('province not found');
        } else {
            province.destroy().then(() => {
                return res.send(`Deleted province with id: ${req.params.id}`);
            }).catch(err => {
                if (err.name === 'SequelizeForeignKeyConstraintError') {
                    return res.status(400).send('Cannot delete province because it is being referenced by another table');
                }
                return res.status(500).send(err.message);
            });
        }
    }).catch(err => {
        return res.status(500).send(err.message);
    });
});

module.exports = router;