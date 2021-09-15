import patients from '../../data/patients';

import { PatientEntry , NonSentivePatientEntry } from '../types';

const getEntries = () : Array<PatientEntry> => {
    return patients;
};

const getNonSentiveEntries = () : Array<NonSentivePatientEntry> => {
    return patients.map( ({id,name,occupation,dateOfBirth,gender}) => {
        return {
            id,
            name,
            occupation,
            dateOfBirth,
            gender
        };
    });
};

export default {
    getEntries,
    getNonSentiveEntries
};