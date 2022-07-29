//DEPLOY: this is an API for the items resource
const express = require('express');
const router = express.Router();
const apiItemsCtrl = require('../controllers/api/items');

router.get('/items', apiItemsCtrl.index);
router.get('/items/:id', apiItemsCtrl.show);
router.post('/items', apiItemsCtrl.create);
router.put('/items/:id', apiItemsCtrl.update);
router.delete('/items/:id', apiItemsCtrl.delete);

module.exports = router;