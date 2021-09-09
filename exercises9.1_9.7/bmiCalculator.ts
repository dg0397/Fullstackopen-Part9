type Result = string
const calculateBmi = (heigth:number,weight:number): Result => {
    if(heigth === 0) throw new Error(`Height must be greater than 0!`)
    const bmi = (weight/((heigth/100)**2))
    let result : Result;
    
    if(bmi < 16){
        result = 'Underweight (Severe thinness)'
    }else if(bmi < 17){
        result = 'Underweight (Moderate thinness)'
    }else if(bmi < 18.5){
        result = 'Underweight (Mild thinness)'
    }else if(bmi < 25){
        result = 'Normal range (healthy weight)'
    }else if(bmi < 30){
        result = 'Overweight (Pre-obese)'
    }else if(bmi < 35){
        result = 'Obese (Class I)'
    }else if(bmi < 40){
        result = 'Obese (Class II)'
    }else {
        result = 'Obese (Class III)'
    }
    return result
}

try {
    console.log(calculateBmi(0, 74))    
} catch (error) {
    console.log("Something went wrong, error message: ",error.message)
}

