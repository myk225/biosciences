import { useState } from 'react'
import './auth.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
// import { setUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../../store/slices/auth';
import { toast } from 'react-toastify';

export const Login = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const [eye,setEye]=useState(false);
    const [formInputs,setFormInputs]=useState();
    function handleChange(e){
        setFormInputs({...formInputs,[e.target.name] : e.target.value});
    } 
    // https://biobackend.cs-it.in
    function handleSubmit(e){
        dispatch(loginStart())
      e.preventDefault();
      fetch(`https://biobackend.cs-it.in/auth/v1/login`,{
        method:"POST",
        credentials: 'include',
        headers:{
          "Content-Type" :"application/json",
        },
        body: JSON.stringify(formInputs)
      }).then((response)=>response.json())
      .then(res=>{
        if(res.success){
          toast.success("Login Success");
          console.log(res.userInfo)
          dispatch(loginSuccess(res.userInfo));
          navigate("/");
          console.log("hello")
          return;
        }
        toast.error("Invalid Creds");
        dispatch(loginFailure({message:"invalid creds"}))
      }).catch((err)=>{
        toast.error(err.message)
      })
      // if(formInputs?.email=="test" && formInputs?.password == "Testpass1"){
      //   toast.success("Login Success")
      //   dispatch(loginSuccess({
      //       username: "Tester",
      //       roleId:123,
      //       role: "Admin"
      //   }));
      //   navigate("/")
      // }else{
      //   toast.error("Invalid Creds");
      //   dispatch(loginFailure({message:"invalid creds"}))
      // }
    }
    // function handleSubmit(e){
    //     e.preventDefault();
    //     console.log(formInputs)
    //     fetch(`https://biobackend.cs-it.in/user/login`,{
    //         method:"POST",
    //         credentials: 'include',
    //         headers:{
    //             "Content-Type" : "application/json",
    //         },
    //         body: JSON.stringify(formInputs)
    //     }).then((data)=>data.json())
    //     .then((res)=>{
    //         if(res.isLoggedIn){
    //                 dispatch(setUser());
    //         }
    //         alert(res.message);
    //     })
    //     .catch((error)=>alert(error.message))
    //     .finally(()=>{
    //         console.log("api call finished")
    //         navigate("/");
    //     })
    // }
  return (
    <div className="authmain">
        <div className="authForm">
            <h2>Login To Your Account...</h2> 
                <div>
                <input className='authInput' type="text" placeholder='enter your email' name="email" onChange={handleChange} />
                </div>
           <div className='passwordMain'>
           <input className='authInput' placeholder='enter password' type={eye ? "text" : "password"} name='password' onChange={handleChange} />
            <div className='eye' onClick={()=>setEye(!eye)}>
                {
                    eye ?   <FaEye /> :   <FaEyeSlash/>
                }
          
          
            </div>
           </div>
            <button className='authLoginBtn' onClick={handleSubmit} >
                login
            </button>
        </div>

    </div>
  )
}
