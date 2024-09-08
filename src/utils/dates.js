import moment from "moment";

// export const areDatesEqual=(date1, date2)=> {
//     // Create new Date objects with seconds and milliseconds set to zero
//     date1=moment(date1).format()
//     date2=moment(date2).format()
//     console.log(date1)
//     const normalizeDate = (date) => {
//         return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
//                         date.getHours(), date.getMinutes(), 0, 0);
//     };

//     // Normalize both dates
//     const normalizedDate1 = normalizeDate(date1);
//     const normalizedDate2 = normalizeDate(date2);

//     // Compare the normalized dates
//     return normalizedDate1.getTime() === normalizedDate2.getTime();
// }

export const areDatesEqual=(date1, date2)=> {
    // Create new Date objects with seconds and milliseconds set to zero    
    const date1Array=date1.split("T");
    const date2Array=date2.split("T");
    if(date1Array[0]===date2Array[0]){
        const time1=date1Array[1].split(":");
        const time2=date2Array[1].split(":");
       
        if(time1[0]==time2[0] && time1[1]==time2[1]){
            console.log('time1 : '+time1)
            console.log('time2 : '+time2)
            return true;
        }
    }else{ 
        return false;
    }

    return false;
}

