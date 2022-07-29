const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/items');

router.get('/', itemsCtrl.index);
//router.get('/:id/edit', itemsCtrl.edit); //Uncomment for dedicated edit view
router.get('/:id', itemsCtrl.show);
router.post('/', itemsCtrl.create);
router.delete('/:id', itemsCtrl.delete);
router.put('/:id', itemsCtrl.update);

module.exports = router;