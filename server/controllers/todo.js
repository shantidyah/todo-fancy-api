var Todos = require('../models/todo')
const jwt = require('jsonwebtoken')


class Todo{
    static show(req,res){
        var decode = jwt.verify(req.headers.tokenjwt, process.env.secret_key)
        console.log(decode);
        
        Todos.find({
            idUser:decode.id
            // todo:"mak"
        })
        .then(todos=>{
            // console.log(todos);
            
            res.json(todos)
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static add(req,res){
        var decode = jwt.verify(req.headers.tokenjwt, process.env.secret_key)
        var date = Number(req.body.deadline)
        var createDate = new Date()
        var deadLine = createDate.setDate(createDate.getDate()+date)

        // console.log(decode);
        Todos.create({
            todo:req.body.todo,
            idUser:decode.id,
            deadLine:new Date(deadLine)
        },function(err,todo){
            if(err){
                console.log(err);
                res.json(err)
            }
            else{
                console.log(todo);
                res.json(todo)
            }
        })
    }
    static delete(req,res){
        Todos.findByIdAndDelete(req.params.id,function(err,todo){
            if(err){
                res.json(err)
            }
            else{
                res.json(todo)
            }
        })
    }
    static update(req,res){
        Todos.findByIdAndUpdate(req.params.id,{
            todo:req.body.todo
        },function(err,todo){
            if(err){
                res.json(err)
            }
            else{
                res.json(todo)
            }
        })
    }
    static statusupdate(req,res){
        Todos.findByIdAndUpdate(req.params.id,{
            status:req.body.status
        },function(err,todo){
            if(err){
                res.json(err)
            }
            else{
                res.json(todo)
            }
        })
    }
}

module.exports = Todo