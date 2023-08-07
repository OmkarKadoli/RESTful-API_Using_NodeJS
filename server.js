const express = require('express');
const app = express();


//Routes 

app.get('/', (req, res) => {
    res.send("RESTful API..");
})




app.listen(3000, ()=>{
    console.log("Applicaion Running on Port 3000");
});

