import {z} from 'zod';

// const activity1=z.object({
//         studyName : z.string({required_error:"Please Provide a Study Name"}),
//         peroids: z.object({
//             startDate: z.string({required_error:"Start Date required For All Peroids please check"}).datetime()
//         }).array(),
//         groups : z.object({
//             totalAnimals: z.string({required_error:"Please Define Total No Of Animals"}),
//             timpePoints: z.string({required_error:"Timepoints required for each animal inside a group"}),
//              animals: z.object(
//                {
//                 animalId: z.string({required_error:"Animal Id Is Required"})
//                }
//              ).array()
//         }).array()
// })
const activity1data=z.object({
    studyname : z.string({required_error:"Please Provide a Study Name"}),
    periods: z.string({required_error:"define perroids for this study"}),
    groups : z.object({
        totalAnimals: z.string({required_error:"Please Define Total No Of Animals"}),
        timepoints: z.string({required_error:"Timepoints required for each animal inside a group"}),
         animals: z.object(
           {
            animalId: z.string({required_error:"Animal Id Is Required"})
           }
         ).array({required_error:"Groups cant be empty"}).nonempty({required_error:"Animals Must Be There in each group"})
    }).array({required_error:"Groups cant be empty"}).nonempty({required_error:"Groups cant be empty",message:"Groups cant be empty"})
})
try {
    const parsedData=activity1.parse({
        "studyname": 1,
        "groups": [
            {
                "groupName": "Group1",
                "timepoints": "6",
                "totalAnimals": "1",
                "animals": [
                    {
                    
                        "animalId": "2",
                        "timepoints": "0",
                        "description": "",
                        "index": 0
                    }
                ],
                "preDoseTime": null,
                "doseTime": null,
                "description": "",
                "index": 0
            }
        ],
        "periods": "3"
    });
    
} catch (error) {
    // console.log(error.errors[0].message);
}


export default activity1data;