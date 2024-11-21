import { useEffect, useState } from "react";
import Table from "../tables/Table"
import "./index.css"
import { Button, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useFetch from "../../hooks/fetch";
import { Loader } from "../loaders/Loader";
import { toast } from "react-toastify";
const addColums=[
  {id : 1,title : "User Id",slug : "userId",type:"data",dataType : "text",editModal : false},
  {id : 2 , title : "First Name",slug : "firstname",type:"data",dataType : "text",editModal : true},
  {id : 3 , title : "Last Name",slug :"lastname",type:"data",dataType : "text" ,editModal : true},
  {id : 4 , title : "Email" , slug : "email",type:"data",dataType : "text",editModal : true},
  {id : 5 , title : "Phone" , slug : "phone",type:"data",dataType : "text",editModal : true},
  {id : 6, title : "created at" , slug : "created_at",type:"data",dataType : "text"},
  {id : 7, title : "updated at" , slug: "updated_at",type:"data",dataType : "text"},
  {
    id : 8 , title : "Edit User" , slug : "Edit User",type :"button",
  },
  {
    id : 9 , title : "Change Password" , slug : "change password",type :"button",
  },
  {
    id : 10 , title : "Update Role",slug : "Role",type :"button"
  },
  {
    id : 11 , title : "Deactivate",slug : "Deactivate",type :"button"
  }
]
export const Users = () => {
  const [reload,setReload]=useState(0);
    const [show, setShow] = useState(false);
    const [eye,setEye]=useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputs,setInputs]=useState({});
    const [roles,setRoles]=useState([]);
    function handleChange(e){
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
    }
    useEffect(()=>{
      fetch(`https://biobackend.cs-it.in/auth/v1/getRoles`)
      .then((res)=> res.json())
      .then((data)=>{
        setRoles(data.roles);
      }).catch((error)=>{
        console.log(error)
      })
    },[show])
  const {error,data,isLoading} = useFetch(`https://biobackend.cs-it.in/auth/v1/getUsers`,{
    method : "GET",
  },[show,reload]);
  console.log(data, "sodfhiosudhfviusdnvihsun");
    function handleSubmit(e){
        e.preventDefault();
        console.log({...inputs});
        fetch(`https://biobackend.cs-it.in/auth/v1/registerUser`,{
          method : "POST",
          credentials : "include",
          headers:{
              "Content-Type": "application/json",
          },
          body : JSON.stringify(inputs)
        }).then((response)=>response.json())
        .then((res)=>{
          if(res.success){
            return toast.success(res.message);
          }
          toast.info(res.message)
        }).catch((error)=>{
          toast.error("something went wrong while adding user");
        })
        setInputs({});
        handleClose();
    }
    if(isLoading){
      return <Loader/>
    }
    if(error){
      return <p>error ...</p>
    }
    if(data){
      return (
        <div className="mainTableContainer">
            <div className="action">
                <h2>User Roles</h2>
                <div className="d-flex gap-2 align-items-center">
                <div className="paginate">
                    <button>prev</button>
                    <button className="bg-info">9</button>
                    <button>next</button>
                 </div>
                <button onClick={handleShow}>Add</button>
                </div>
               
            </div>
                <div className="w-100">
                <Table columns={addColums} rows={data.users} setReload={setReload} reload={reload} roles={roles} />
                </div>
            <Modal show={show} size="md" centered onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add A New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
    
                <form action="" className="d-flex flex-column gap-2">
                    <label className="bold" htmlFor=""> Enter Firstname</label>
                    <input type="text" name="firstname" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Firstname" />
                    <label className="bold" htmlFor=""> Enter Lastname</label>
                    <input type="text" name="lastname" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Lastname" />
                    <label className="bold" htmlFor="">Phone</label>
                    <input type="text" name="phone" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Phone" />
                    <label className="bold" htmlFor=""> Enter Email</label>
                    <input type="text" name="email" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Email" />
                    <label className="bold" htmlFor="">Enter Password</label>
                    <div className="passwordMain">
                    <input type={eye ? "text" : "password"} name="password" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Password" />
                        <div className="eye"  onClick={()=>setEye(!eye)}>
                        {
                        eye ?  <FaEyeSlash/>  :    <FaEye />
                    }
                        </div>
                    </div>
                    <label className="bold" htmlFor="">Check Role For This User</label>
                    
                        <div className="d-flex flex-wrap gap-3">
    
                         {
                             roles?.map((item,i)=><div key={i} className="d-flex gap-1 align-items-center">
                                    
                                    <input onChange={handleChange} name="roleId" value={item.roleId} type="radio"/>
                                    <label>{item.roleName}</label>
                             </div>)
                        }
                        </div>
                        
             
                </form>
    
    
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary"  onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
}
