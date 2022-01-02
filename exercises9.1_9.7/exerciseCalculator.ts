type Rating = 1 | 2 | 3;

interface ResultObj {
    periodLength : number;
    trainingDays : number;
    success : boolean;
    rating : Rating;
    ratingDescription : string;
    target : number;
    average : number
}

interface exerciseCalculatorValues {
    target: number;
    dailyExercisesHours: Array<number>;
}
const parseArgumentsToexerciseCalculator = (args: Array<string>): exerciseCalculatorValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (args.slice(2).every(value => isNaN(Number(value)) === false)) {
      return {
        target: Number(args[2]),
        dailyExercisesHours: args.slice(3).map(value => Number(value))
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const exerciseCalculator = ( dailyExercisesHours:Array<number>, target: number) : ResultObj => {
    const periodLength = dailyExercisesHours.length;

    if(periodLength < 1) throw new Error(`The period of days must be greather than 1`);
    
    const trainingDays = dailyExercisesHours.filter(value => value > 0).length;
    const average = dailyExercisesHours.reduce(( a , b ) => a + b, 0)/periodLength;
    const success = average >= target ? true : false;
    const rating : Rating = success === true ? 3 : average > target/2 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'Well done! Continue with same pace' : rating === 2 ? 'not too bad but could be better' : 'You must work much more';

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};


try {
    const {target,dailyExercisesHours} = parseArgumentsToexerciseCalculator(process.argv);
    console.log(exerciseCalculator(dailyExercisesHours,target));    
} catch (error:unknown) {
    if(error instanceof Error){
        console.log("Something went wrong, error message: ",error.message);
    }
}

