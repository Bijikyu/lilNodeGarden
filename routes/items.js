const express = require('express');
const router = express.Router();
const itemsCtrl = require('../controllers/items');

router.get('/', itemsCtrl.index);
router.get('/itemsAPI', itemsCtrl.index);
//router.get('/:id/edit', itemsCtrl.edit); //Uncomment for dedicated edit view
router.get('/itemsAPI/:id', itemsCtrl.show);
router.get('/:id', itemsCtrl.show);
router.post('/itemsAPI', itemsCtrl.create);
router.post('/', itemsCtrl.create);
router.delete('/itemsAPI/:id', itemsCtrl.delete);
router.delete('/:id', itemsCtrl.delete);
router.put('/itemsAPI/:id', itemsCtrl.update);
router.put('/:id', itemsCtrl.update);

module.exports = router;