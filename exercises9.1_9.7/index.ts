import express = require('express');
import { calculateBmi } from './bmiCalculator';

const app = express()

const PORT = 3000

app.get('/hello',(_req,res)=>{
    res.send('Hello Full Stack!')
})
app.get('/bmi',(req,res)=>{
    const {height,weight} = req.query
    if(
        isNaN(Number(height)) 
        || isNaN(Number(weight)) 
        || !height 
        || !weight 
        || Number(height) <= 0 
        || Number(weight) <= 0
    ){
        res.status(400).send({ error: "malformatted parameters"})
    }else{
        const bmi = calculateBmi(Number(height),Number(weight))
        res.json({
            weight,
            height,
            bmi
        })
    }
    
})

app.listen(PORT,() => console.log(`Server running on port ${PORT}`))