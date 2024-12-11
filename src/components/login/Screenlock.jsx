import { useDispatch, useSelector } from "react-redux"
import { logout, unLockscreen, wrongPin } from "../../store/slices/auth";
import { toast } from "react-toastify";
import { useState } from "react";

export const Screenlock = () => {
    const dispatch=useDispatch();
    const { auth } = useSelector((state) => state);
    const [pin,setPin]=useState();
    function checkPin(){
        console.log(auth)
        if(auth.pinTries == 4){
            toast.error("Five Wrong Pin Tries Logging Out Now");
            dispatch(logout());
            return
        }
        if(auth.user.lockPin == pin){
            dispatch(unLockscreen())
            toast.success("UnLocked")
            return;
        }
        dispatch(wrongPin())
        toast.warn("wrong pin");
    }
  return (
    <div className="container">
        <div className="">
            <input type="text" onChange={(e)=>{
                setPin(e.target.value)
            }} />
            <button onClick={checkPin}>Enter</button>
        </div>
    </div>
  )
}
