import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getEntries = () : Array<DiagnoseEntry> => {
    return diagnoses;
};

const findById = (code:string) : DiagnoseEntry | undefined=> {
    const entry = diagnoses.find( diagnose => diagnose.code === code);
    return entry;
};

export default {
    getEntries,
    findById
};

