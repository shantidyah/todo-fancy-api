var User = require('../models/user')
var jwt = require('jsonwebtoken')
var FB = require('fb')
const bcrypt = require('bcryptjs');



class FbController{
    static getDataFromFb(req,res){
        FB.api('me',{
            fields: ['id','name','email'], access_token: req.headers.token
        }, function(response){
            // console.log(response);
            User.findOne({
                email:response.email
            })
            .then(result=>{
                if(result){
                    var token = jwt.sign({
                        name:result.name,
                        data: result.email,
                        id: result._id
                    }, process.env.secret_key)
                    res.json({
                        tokenFb: token
                    })
                }
                else{
                    const saltRounds = 5;
                    var salt = bcrypt.genSaltSync(saltRounds);
                    var hash = bcrypt.hashSync(response.email, salt);
                    User.create({
                        name: response.name,
                        email: response.email,
                        password:hash
                    })
                    .then(user=>{
                        // console.log(user);
                        var token = jwt.sign({
                            data: user.email,
                            id: user._id
                        }, process.env.secret_key)
                        res.json({
                            tokenFb: token
                        })
                    })
                }
            })
        })
        
    }
}

module.exports = FbController