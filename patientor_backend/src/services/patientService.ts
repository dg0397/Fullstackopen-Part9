import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry , PublicPatient , NewPatientEntry } from '../types';

const getEntries = () : Array<PatientEntry> => {
    return patients;
};

const getPublicsPatient = () : Array<PublicPatient> => {
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
    const entries : [] = [];
    const newPatientEntry = {
        id,
        entries,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getPublicsPatient,
    findById,
    addPatient
};