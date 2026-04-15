const express = require('express')
const app = express()
app.use(express.json())
const quotes = require('./models/schema')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/quoteDb')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err))
app.get("/",(req,res)=>{
    res.send("Welcome to Quote API")
})
app.post("/qoutes",async (req,res)=>{
    try{
         const newqoute = new quotes({
            qoutes : req.body.qoute,
            author:req.body.author
         })
        const saveqoute = await newqoute.save()
        res.status(201).json(saveqoute)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
app.get("/qoutes/random",async (req,res)=>{
    try{
        const count = await quotes.countDocuments()
        const random = Math.floor(Math.random()*count)
     const randomqoute = await quotes.findOne().skip(random)
     res.json(randomqoute)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
app.listen(3000, () => console.log('Server running on port 3000'))