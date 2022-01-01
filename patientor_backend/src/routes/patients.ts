import express from 'express';
import patientService from '../services/patientService';
import { toNewEntryData, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/',(_req,res)=>{
    res.send(patientService.getPublicsPatient());
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

router.post('/:id/entries',(req,res) => {
    const patient = patientService.findById(req.params.id);
    if(patient){
        try {
            const newEntryData = toNewEntryData(req.body);
            const newEntry = patientService.addEntry({entry:newEntryData,patient});
            res.json(newEntry);
        } catch (error) {
            if(error instanceof Error){
                res.status(400).send(error.message);
            }
        }
    }else{
        res.sendStatus(404);
    }
});

export default router;