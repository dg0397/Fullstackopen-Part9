import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry , NonSentivePatientEntry , NewPatientEntry } from '../types';

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

const findById = (id:string) : PatientEntry | undefined => {
    const entry = patients.find( patient => patient.id === id);
    return entry;
};

const addPatient = ( entry : NewPatientEntry) : PatientEntry => {
    const id : string = uuid();
    const newPatientEntry = {
        id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSentiveEntries,
    findById,
    addPatient
};