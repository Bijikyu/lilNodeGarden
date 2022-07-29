const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/:id/comments', commentsCtrl.create);
router.delete('/:id', commentsCtrl.delete);
//router.put('/:id', commentsCtrl.update); // not used

module.exports = router;