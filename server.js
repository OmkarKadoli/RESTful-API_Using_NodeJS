const express = require('express');
const mongoose = require('mongoose');
const Users = require('./modules/User');
const app = express();

//Create Middleware

app.use(express.json());

//Routes 

app.get('/', (req, res) => {
    res.send("RESTful API..");
})

//Create Data
app.post('/Users', async(req, res) => {
    
    try
    {
        const users = await Users.create(req.body);
        res.status(200).json(users);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})


//Fetch/Read Data

app.get('/Users', async(req, res) =>{

    try
    {
        const users = await Users.find({});
        res.status(200).json(users);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }

});

//Update Data

app.put('/Users/:id', async(req, res) => {

    try
    {
        const {id} = req.params;
        const users = await Users.findByIdAndUpdate(id,req.body);

        if(!users)
        {
            return res.status(404).json({message : `Cannot find any User with ID : ${id}`});
        }
        else
        {
            const updatedUser = await Users.findById(id);
            res.status(200).json(updatedUser);
        }
        
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }

});

//Delete Data

app.delete('/Users/:id', async(req, res) => {

    try
    {
        const {id} = req.params;
        const users = await Users.findByIdAndDelete(id,req.body);

        if(!users)
        {
            return res.status(404).json({message : `Cannot find any User with ID : ${id}`});
        }
        else
        {
            res.status(200).json(users);
        }
        
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }

})


app.listen(3000, ()=>{
    console.log("Applicaion Running on Port 3000");
});

//Connection with MongoDB

mongoose
.connect('mongodb+srv://omkarkadoli:Omkar281994@cluster0.ykpqe7c.mongodb.net/RESTful_API?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected With MongoDB Database Successfully..!");
}).catch((error) => {
    console.log(error);
})