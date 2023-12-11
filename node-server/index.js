const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://mongodb:127017/taskM');
    console.log('db connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
})

const taskSchema = new mongoose.Schema({
  title: String,
  description: String, 
  status: String,
  subtasks: [{
    title: String,
    isCompleted: Boolean
  }]
});

const columnSchema = new mongoose.Schema({
  name: String, 
  tasks: [taskSchema]
});

const boardSchema = new mongoose.Schema({
  name: String,
  isActive: Boolean,
  columns: [columnSchema]  
});

const DataSchema = new mongoose.Schema({
    data: [boardSchema],
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const User = mongoose.model('User',UserSchema);
const Data = mongoose.model('Data',DataSchema);
// const Board = mongoose.model('Board',BoardSchema);
// const Column = mongoose.model('Column',ColumnSchema);

const server = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname,'logs.log'),{flags: 'a'});

server.use(cors());
server.use(morgan('combined', {stream: accessLogStream}));
server.use(bodyParser.json());

server.post('/users', async (req,res) => {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    const doc = await user.save();
    res.json(doc);
})

server.get('/users', async (req,res) => {
    const docs = await User.find({});
    res.json(docs);
})

server.get('/users/:id/data', async (req,res) => {
    const docs = await Data.find({})
    res.send(docs);
})

server.post('/users/:id/data', async (req,res) => {
    let newData = new Data({
        data: [],
        _userId: req.body._id
    });
    const doc = await newData.save();
    console.log(doc);
    res.json(doc);
})

server.post('/users/:id/data1', async (req,res) => {
    const doc = await Data.findOneAndReplace({ _userId: req.body._userId}, {
        data: req.body.data,
        _userId: req.body._userId
    })
    console.log(doc);
    res.json(doc);
})

server.listen(4000,()=>{
    console.log("Server is running on port 4000");
})