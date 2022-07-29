const express = require('express');
const router = express.Router();
const blogsCtrl = require('../controllers/blogs');

router.get('/new', blogsCtrl.new);
router.get('/', blogsCtrl.index);
router.get('/:id/edit', blogsCtrl.edit);
router.get('/:id', blogsCtrl.show);
router.post('/', blogsCtrl.create);
router.delete('/:id', blogsCtrl.delete);
router.put('/:id', blogsCtrl.update);

module.exports = router;