var express = require('express');
var router = express.Router();
var Todos = require('../controllers/todo')
/* GET users listivang. */
router.get('/',Todos.show);
router.post('/add',Todos.add);
router.delete('/delete/:id',Todos.delete);
router.put('/edit/:id',Todos.update);
router.put('/status/:id',Todos.statusupdate)

module.exports = router;
