const mongoose = require('mongoose');
 

// mongoose.connect(`mongodb://${process.env.userdb}:<dbpassword>@ds131531.mlab.com:31531/todo-fancy`,{useNewUrlParser:true})

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schemaTodo = new Schema({
    todo: String,
    idUser: String,
    // { type: Schema.Types.ObjectId, ref: 'User' },
    deadLine : String,
    create : String,
    status: { type: String, default: 'uncomplete' }
},{
    timestamps:true
});

const Todo = mongoose.model('Todo', schemaTodo);

module.exports = Todo