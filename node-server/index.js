const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/taskM');
    console.log('db connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

const User = mongoose.model('User',UserSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post('/users', async (req,res) => {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    const doc = await user.save();
    console.log(doc);
    res.json(doc);
})

server.get('/users', async (req,res) => {
    const docs = await User.find({});
    res.json(docs);
})

server.listen(8080,()=>{
    console.log("Server is running on port 8080");
})