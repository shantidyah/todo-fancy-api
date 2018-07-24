var express = require('express');
var router = express.Router();
var User = require('../controllers/user')

router.get('/',User.show);
router.post('/add',User.add);
// router.post('/login',User.add);

router.post('/delete/:id',User.delete);
router.put('/edit/:id',User.update);

module.exports = router;
