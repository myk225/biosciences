import {z} from 'zod';

export const step1Valid=z.object({
    studyNumber : z.string({required_error:"Please Provide Study Number"}),
    studyName : z.string({required_error:"Please Provide a Study Name"}),
    noOfGroups : z.string({required_error:"please provide no of groups"}),
    noOfPeroids : z.string({required_error:"please provide no of peroids"}),
    speciesId : z.string({required_error:"Please select a species"}),
    centrifugationWithIn: z.string({required_error:"Please enter centrifugation with in"}),
    centrifugationDuration : z.string({required_error:"Please select a species"}),
    anticogulant : z.string({required_error:"Please provide anticogulant"}),
    storedAtTemperature : z.string({required_error:"please provide storedAtTemperature"}),

})

export const peroidDetailsValid=z.object({
    peroidName: z.string({required_error:"Please Provide a peroid id"}),
    peroidStart: z.string({required_error:"peroid start is required"})
}).array({required_error:"please provide the peroid data"});

export const groupDetailsValid=z.object({
    studyName: z.string({required_error:"please provide group name"}),
    noOfTimepoints: z.string({required_error:"please provide timepoints for every group"}),
    nofAnimals : z.string({required_error:"please provide number of animals"}),
    typeOfTreatment: z.string({required_error:"please provide type of treatment"}),
    routeOfAdministration : z.string({required_error:"route of administration is required"}),
    treatmen:z.string({required_error:"treatment is required"}),
    dose:z.string({required_error:"dose is required"}),
    doseVol:z.string({required_error:"doseVol is required"}),
    concentration : z.string({required_error:"treatment is required"}),
}).array({required_error:"please provide the group data"});