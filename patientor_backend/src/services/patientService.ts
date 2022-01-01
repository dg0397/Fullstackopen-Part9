import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry , PublicPatient , NewPatientEntry, EntryWithoutId, Entry } from '../types';

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

const addEntry = ({entry, patient}:{entry:EntryWithoutId, patient:PatientEntry }) : Entry => {
    const id : string = uuid();
    //const entryData = getEntryType(entry);
    const newEntry : Entry = {
        id,
        ...entry
    };
    patient.entries = [...patient.entries,newEntry];
    return newEntry; 
};
export default {
    getEntries,
    getPublicsPatient,
    findById,
    addPatient,
    addEntry
};