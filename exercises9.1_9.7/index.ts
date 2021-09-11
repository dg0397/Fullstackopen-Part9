import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/hello',(_req,res)=>{
    res.send('Hello Full Stack!');
});
app.get('/bmi',(req,res)=>{
    const {height,weight} = req.query;
    if(
        isNaN(Number(height)) 
        || isNaN(Number(weight)) 
        || !height 
        || !weight 
        || Number(height) <= 0 
        || Number(weight) <= 0
    ){
        res.status(400).send({ error: "malformatted parameters"});
    }else{
        const bmi = calculateBmi(Number(height),Number(weight));
        res.json({
            weight,
            height,
            bmi
        });
    }
    
});

app.post('/exercises',(req,res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises,target} = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dailyExercisesHours:Array<number> = [...daily_exercises];

    if(!daily_exercises || !target){
        res.status(400).json({
            error: "parameters missing"
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }else if( isNaN(Number(target)) || !dailyExercisesHours.every( (value: any) => isNaN(Number(value)) === false) ){
        res.status(400).json({
            error: "malformatted parameters"
        });
    }else{
        try {
            const daylyHours = dailyExercisesHours.map(value => Number(value));
            const targetHour = Number(target);
            
            const result = exerciseCalculator(daylyHours,targetHour);
            res.json(result);
        } catch (error) {
            if(error instanceof Error){
                console.log("Something went wrong, error message: ",error.message);
                res.status(400).json({
                    error: error.message
                });
            }
        }
    }
});

app.listen(PORT,() => console.log(`Server running on port ${PORT}`));