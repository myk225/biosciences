import { useEffect, useState } from "react";
import Table from "../tables/Table"
import "./index.css"
import { Button, Modal } from "react-bootstrap";

import { Loader } from "../loaders/Loader";
import useFetch from "../../hooks/fetch";
import { TiEdit } from "react-icons/ti";
import { toast } from "react-toastify";
const rolesColumns=[{
    id : 1, title : "Role Id", type :"data" ,slug: "roleId"
},{
    id : 2 , title : "Role Name",type :"data", slug:"roleName"
},{
    id : 3 , title : "Description",type :"data",slug:"description"
},{
    id : 4 , title : "Created At",type :"data",slug : "createdAt"
},{
    id : 5 , title : "Updated At",type :"data",slug : "updatedAt"
},{
    id : 6 , title : "Edit Role" , type :"button", slug : "EDIT"
}
]
export const Roles = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading]=useState(false);
    const [error2,setError]=useState(false);
    const [permissions,setPermissions]=useState([]);
    const [reload,setReload]=useState(0);
 
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputs,setInputs]=useState({});
    useEffect(()=>{
        setLoading(true);
        fetch(`https://biobackend.cs-it.in/auth/v1/getPermissions`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            setPermissions(data.permissions);
            setLoading(false);
            
        }).catch(()=>{
            setError(true);
            setLoading(false);
        })
    },[])
   
    const {error,data,isLoading} = useFetch(`https://biobackend.cs-it.in/auth/v1/getRoles`,{
        method : "GET",
      },[reload]);
   
    function handleChange(e){
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
    }
    const [selectedItems,setSelectedItems]=useState([]); 
    function handleSubmit(e){
        e.preventDefault();
        console.log({...inputs,permissions:selectedItems});
        fetch(`https://biobackend.cs-it.in/auth/v1/createRole`,{
            method : "POST",
            credentials : "include",
            headers:{
                "Content-Type": "application/json",
            },
            body : JSON.stringify({...inputs,permissions: selectedItems})
        }).then((res)=> res.json())
        .then((data)=>{
            console.log(data)
            toast(data.message);
            setReload(prev => prev+1)
        }).catch((err)=>{
            toast.error("Something went wrong");
        })
        setInputs({});
        setSelectedItems([]);
        handleClose();
    }

    if(error || error2){
        return <div>error ...... </div>
    }
    if(isLoading || loading){
        return <Loader/>
    }
  
   if(data && permissions ){
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
                <Table columns={rolesColumns} data={{...permissions}} setReload={setReload} permissions={permissions} rows={data?.roles}/>
                </div>
            <Modal show={show} size="md" centered onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add A New Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
    
                <form action="" className="d-flex flex-column gap-2">
                    <label className="bold" htmlFor=""> Enter Role Name</label>
                    <input type="text" name="roleName" onChange={handleChange} className="w-100 m-auto p-2" placeholder="Enter Role Name" />
                    <label className="bold" htmlFor="">Check Permissions/Rights</label>
                    {/* <select className="form-select" onChange={(e)=>{
                        alert(e.target.value)
                        let test=selectedItems.includes(e.target.value)
                        if(!test){
                            setSelectedItems(prev=>[...prev,e.target.value])
                        }
                        
                    }} name="" id="">
                        {
                            ["first","second","Third"].map((item,i)=><option key={i} value={item} className="">{item}</option>)
                        }
                    </select> */}
                        <div className="d-flex flex-wrap gap-3">
    
                         {
                             permissions?.map((item,i)=><div key={i} className="d-flex gap-1 align-items-center">
                                    
                                    <input onClick={(e)=>{
                                        if(e.target.checked==true){
                                            setSelectedItems(prev=>[...prev,item])
                                        }else{
                                            let filteredItems=selectedItems.filter((curr)=>curr.id!==item.id);
                                            setSelectedItems(filteredItems)
                                        }
                                    }}   name={item.permissionName} type="checkbox"/>
                                    <label htmlFor="">{item.permissionName}</label>
                             </div>)
                        }
                        </div>
    
                    {/* <div className="selectedItems w-100 d-flex">
                        {
                            selectedItems.map((elem,i)=>{
                                return <p key={i}>{elem}</p>
                            })
                        }
                    </div> */}
                    <label className="bold" htmlFor="">Some Description</label>
                   <textarea type="text" rows="5"name="description" className="w-100 m-auto p-2" onChange={handleChange} placeholder="enter some description" />
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

