const express = require('express');
const router = express.Router();
const todosCtrl = require('../controllers/todos');

router.get('/', todosCtrl.index);
router.get('/:id/edit', todosCtrl.edit);
router.get('/:id', todosCtrl.show);
router.post('/', todosCtrl.create);
router.delete('/:id', todosCtrl.delete);
router.put('/:id', todosCtrl.update);

module.exports = router;