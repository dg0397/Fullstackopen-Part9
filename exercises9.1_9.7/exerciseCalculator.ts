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

const exerciseCalculator = ( dailyExerciseHours:Array<number>, target: number) : ResultObj => {
    const periodLength = dailyExerciseHours.length;

    if(periodLength < 1 || periodLength > 7) throw new Error(`The period of days must be between 1 and 7`)
    
    const trainingDays = dailyExerciseHours.filter(value => value > 0).length;
    const average = dailyExerciseHours.reduce(( a , b ) => a + b, 0)/periodLength
    const success = average >= target ? true : false;
    const rating : Rating = success === true ? 3 : average > target/2 ? 2 : 1
    const ratingDescription = rating === 3 ? 'Well done! Continue with same pace' : rating === 2 ? 'not too bad but could be better' : 'You must work much more'

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}


try {
    console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))    
} catch (error) {
    console.log("Something went wrong, error message: ",error.message)
}

