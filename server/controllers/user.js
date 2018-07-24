const Users = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.secret_key)


class User{
    static show(req,res){
        Users.find({},(err,users)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(users)
            }
        })
    }
    static add(req,res){
        const saltRounds = 5;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(req.body.password, salt);
        console.log("masuk routes add");
        
        Users.find({
            email:req.body.email
        },(err,user)=>{
            if(user.length>0){
                res.json("email already used")
            }
            else{
                Users.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                },function(err,user){
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json(user)
                    }
                })
            }
        })
    }
    static delete(req,res){
        Users.findByIdAndDelete(req.params.id,function(err,user){
            if(err){
                res.json(err)
            }
            else{
                res.json(user)
            }
        })
    }
    static update(req,res){
        Users.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },function(err,user){
            if(err){
                res.json(err)
            }
            else{
                res.json(user)
            }
        })
    }
}

module.exports = User