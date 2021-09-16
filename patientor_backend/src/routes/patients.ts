import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/',(_req,res)=>{
    res.send(patientService.getNonSentiveEntries());
});

router.get('/:id',(req,res) => {
    const patient = patientService.findById(req.params.id); 
    
    if(patient){
        res.send(patient);
    }else{
        res.sendStatus(404);
    }
});

router.post('/',(req,res) => {
    try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const newPatient = patientService.addPatient(newPatientEntry);

    res.json(newPatient);
    } catch (error) {
        if(error instanceof Error){
            res.status(400).send(error.message);
        }
    }
});

export default router;