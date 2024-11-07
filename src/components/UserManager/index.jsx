import { useSearchParams } from "react-router-dom";
import { Roles } from "../roles/Roles";
import { Users } from "../users/User";


export const UserManager = () => {
    
    const [params,setParams]=useSearchParams();
    const managermode=params.get('type');
    switch (managermode){
        case "Creation of new roles" :
            return (
              
                     <Roles/>
               
               
            )
        case "Creation of new users" :
            return (
                <Users/>
            )
        default :
            return <div>Nothing Found return to home</div>
    }

}
