type Result = string;
interface calculateBmiValues {
    heigth: number;
    weight: number;
}
const parseArgumentsToCalculateBmi = (args: Array<string>): calculateBmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        heigth: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};
export const calculateBmi = (heigth:number,weight:number): Result => {
    if(heigth < 1) throw new Error(`Height must be greater than 0!`);
    if(weight < 1) throw new Error(`Weight must be greater than 0!`);
    const bmi = (weight/((heigth/100)**2));
    let result : Result;
    
    if(bmi < 16){
        result = 'Underweight (Severe thinness)';
    }else if(bmi < 17){
        result = 'Underweight (Moderate thinness)';
    }else if(bmi < 18.5){
        result = 'Underweight (Mild thinness)';
    }else if(bmi < 25){
        result = 'Normal range (healthy weight)';
    }else if(bmi < 30){
        result = 'Overweight (Pre-obese)';
    }else if(bmi < 35){
        result = 'Obese (Class I)';
    }else if(bmi < 40){
        result = 'Obese (Class II)';
    }else {
        result = 'Obese (Class III)';
    }
    return result;
};

try {
    const {heigth,weight} = parseArgumentsToCalculateBmi(process.argv);
    console.log(calculateBmi(heigth, weight));
} catch (error: unknown) {
    if(error instanceof Error){
        console.log("Something went wrong, error message: ",error.message);
    }
}

