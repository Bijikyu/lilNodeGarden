const express = require('express');
const router = express.Router();
const priorOwnersCtrl = require('../controllers/priorOwners');

router.get('/new', priorOwnersCtrl.new); //TODO: page not linked to, link if needed
//router.get('/:id/edit', priorOwnersCtrl.edit);
//router.get('/:id', priorOwnersCtrl.show);
router.post('/', priorOwnersCtrl.create);
//router.delete('/:id', priorOwnersCtrl.delete);
//router.put('/:id', priorOwnersCtrl.update);

module.exports = router;