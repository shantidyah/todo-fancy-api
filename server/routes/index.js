var express = require('express');
var router = express.Router();
const Users = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)
const {getDataFromFb} = require('../controllers/fb')


/* GET home page. */
router.post('/login', function(req, res) {
  Users.findOne({
    email:req.body.email
  },(err,user)=>{
    if(err){
      res.json(err)
    }
    else{
      if(user!=null){
        var statusPass = bcrypt.compareSync(req.body.password, user.password);
        if(statusPass){
          const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)
          
          res.json(token)
        }
        else{
          console.log("your password wrong");
          res.json("x")
        }
      }
      else{
        res.json("o")
      }
    }
  })
});

router.get('/login/fb',getDataFromFb)


router.get('/converttoken',function(req,res){
  var decode = jwt.verify(req.headers.tokenjwt, process.env.secret_key)
  // console.log(decode);
  res.json(decode)
})

module.exports = router;
