import { Button, Modal } from "react-bootstrap"
import "./index.css"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
const Table = ({
    columns=defaultColumns,
    rows,
    data,
    setReload,
    permissions
}) => {
    
    const [show,setShow]=useState(false)
    const [ePass,setEPass]=useState(false);
    const [deactivate,setDeactivate]=useState(false);
    const [editRole,setEditRole]=useState(false);
    const [updateUserRole,setUpdateUserRole]=useState(false);
    const [updateRolePermissions,setUpdateRolePermissions]=useState(false);
    const [password,setPassword]=useState("");
    const [editItem,setEditItem]=useState({});
    const [selectedItems,setSelectedItems]=useState([]); 
    const [roles,setRoles]=useState([]);
    const [loaderBtn,setLoaderBtn]=useState(false);
    // const [permissions,setPermissions]=useState([]);
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/auth/v1/getRoles2`)
        .then((res)=> res.json())
        .then((data)=>{
          console.log("sjcdiodsjiosj")
          console.log(data)
          setRoles(data.roles);
        }).catch((error)=>{
          console.log(error)
        })
    },[])
    const handleEClose = () => {
        setEPass(false)
        setPassword('')
    };
    const handleEShow = () => setEPass(true);
    const handleClose = () => setShow(false);
    const handleShow1 = (item) => {
        setShow(true);
        setEditItem(item);
    };
    const handleShow2 = (item) =>{
        
        handleEShow(true)
        setEditItem(item);
    }
    console.log(rows,columns)
    function handleChange(e){
        // setInputs(prev=>({...prev,[e.target.name]:e.target.value}));
        
        setEditItem(prev => ({...prev,[e.target.name] : e.target.value}))
    }
    async function handleRoleUpdate(){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/v1/updateUserRole/${editItem.userId}`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({...editItem})
        })
        const res=await response.json();
        if(res.success == true){
            toast.success(res.message);
               setUpdateUserRole(false);
            
               setReload((prev) => prev+1)
              console.log("ohdvhefuhdfhuhfdhginfh")
           return
       }
       toast.warn(res.message)
       setUpdateUserRole(false);
    }
    async function handleSubmit(){
        console.log("inputs :" + editItem.lastname);
        const response=await fetch(`${import.meta.env.VITE_API_URL}/auth/v1/updateUser/${editItem.userId}`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({...editItem})
        })
        const res=await response.json();
        console.log(res)
        if(res.success == true){
             toast.success(res.message);
                setShow(false);
             
                setReload((prev) => prev+1)
               console.log("ohdvhefuhdfhuhfdhginfh  ˆ¨∑˙∂ft ")
            return
        }
        toast.warn(res.message)
        setEPass(false);
    }
    async function handleSubmit2(){
        console.log("i am inside ")
        const response=await fetch(`${import.meta.env.VITE_API_URL}/auth/v1/updatePass/${editItem.userId}`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email: editItem.email,
                password 
            })
        })
        const res=await response.json();
        console.log(res)
        if(res.status == true){
             toast(res.message);
            setEPass(false);
            return
        }
        toast.warn(res.message)
        setEPass(false);
        console.log("updated password is "+ password)
    }

  return (
    <div className="tablemain">
        <div className="contents">
            {
               columns.map((elem,i)=>{
                    return <div className="contentsItem" key={i}>
                 
                        <p>{elem.title}</p>
                    </div>
                })
            }
        </div>
        <div className="main" key={1}>
           {
            rows?.map(item=>(<div className="mainItems" key={item.id}>
                             {
                 columns.map((elem,i)=>{
                    console.log(item , elem.slug , item[elem.slug])  
                    return <div className="contentsItem" key={elem.id}>
                 
                        {
                            elem.type == "data" && <p>{item[elem.slug]}</p>
                        }
                        {
                            elem.type == "button" && 
                          <>
                              {
                                loaderBtn && <button>loading...</button>
                              }
                              {
                                !loaderBtn &&   <button className="btn btn-secondary" onClick={()=>{
                                  console.log(item)
                                  if(elem.title == "Edit User"){
                                      handleShow1(item)
                                  }
                                  if(elem.title == "Change Password"){
                                      handleShow2(item);
                                  }
                                  if(elem.title == "Deactivate"){
                                      setDeactivate(true)
                                  }
                                  if(elem.title == "Edit Role"){
                                    setLoaderBtn(true)
                                      setEditItem(item)
                                      fetch(`${import.meta.env.VITE_API_URL}/auth/v1/getRolePermissions/${item.roleId}`)
                                      .then((res)=>res.json())
                                      .then((data)=>{
                                          setSelectedItems(data.permissions);
                                          setUpdateRolePermissions(true)
                                          
                                      })
                                      .catch((error)=>{
                                          console.log(error)
                                      })
                                      setLoaderBtn(false)
                                 
                                
                                  
                                  }
                                  if(elem.title == "Update Role"){
                                      setUpdateUserRole(true)
                                      setEditItem(item);
                                  }
                              }}>{elem.slug}</button>
                              }
                          </>
                        }
                        
                    </div>
                })
               }

            </div>))
           }
        </div>
           
           {/* decativate modal below
            */}

        <Modal show={deactivate} size="md" centered onHide={()=>setDeactivate(false)} >
            <Modal.Header closeButton>
              <Modal.Title>
              {`Do You Want to DEactivate this user ?`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setDeactivate(false)}>
                Close
              </Button>
              <Button variant="primary"  onClick={handleSubmit2}>
                Confirm
              </Button>
            </Modal.Footer>
           </Modal>
            {/* edit role moddal below
             */}

        <Modal show={editRole} size="md" centered onHide={()=>setEditRole(false)} >
            <Modal.Header closeButton>
              <Modal.Title>
              {`Do You Want to DEactivate this user ?`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setEditRole(false)}>
                Close
              </Button>
              <Button variant="primary"  onClick={handleSubmit2}>
                Confirm
              </Button>
            </Modal.Footer>
           </Modal>

                {/* update user role modal below
                 */}
    
        <Modal show={updateUserRole} size="md" centered onHide={()=>setUpdateUserRole(false)} >
            <Modal.Header closeButton>
              <Modal.Title>
              {`Do You Want to update ${editItem.firstname} ${editItem.lastname}'s role ?`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    
                      <div className="container d-flex gap-3 flex-wrap">
                      {
                            roles?.map((item,i)=><div key={i} className="d-flex gap-1 align-items-center">
                                    
                            <input onChange={handleChange} name="roleId" defaultChecked={item.roleId == editItem.roleId} value={item.roleId} type="radio"/>
                            <label>{item.roleName}</label>
                     </div>)
                        }
                      </div>
                       
                
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setUpdateUserRole(false)}>
                Close
              </Button>
              <Button variant="primary"  onClick={handleRoleUpdate}>
                Confirm
              </Button>
            </Modal.Footer>
           </Modal>
           <Modal show={ePass} size="md" centered onHide={handleEClose} >
            <Modal.Header closeButton>
              <Modal.Title>
              {`Update ${editItem.firstname}'s Password`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form action="" className="d-flex flex-column gap-2">
                    {
                        columns.map((col)=>{
                           if(col.title == "Change Password" ){
                            return <>
                            <label className="bold" htmlFor="">{col.slug}</label>
                            <input type={col.dataType} name={col.slug} onChange={(e)=>{
                                setPassword(e.target.value)
                            }} value={password} className="w-100 m-auto p-2" placeholder={col.title} />
                        </>
                           }
                        })
                    }
            
                   
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEClose}>
                Close
              </Button>
              <Button variant="primary"  onClick={handleSubmit2}>
                Save Changes
              </Button>
            </Modal.Footer>
           </Modal>
                {/* update user details modal below
                 */}
         <Modal show={show} size="md" centered onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{`Editing User ${editItem.firstname}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
    
                <form action="" className="d-flex flex-column gap-2">
                    {
                        columns.map((col)=>{
                           if(col.type == "data" && col.editModal){
                            return <>
                            <label className="bold" htmlFor="">{col.slug}</label>
                            <input type={col.dataType} name={col.slug} onChange={handleChange} value={editItem[col.slug]} className="w-100 m-auto p-2" placeholder="Enter Role Name" />
                        </>
                           }
                        })
                    }
            
                   
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
         
         {/* change permissions modal below */}
         <Modal show={updateRolePermissions} size="md" centered onHide={()=>setUpdateRolePermissions(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update This Role  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
    
                <form action="" className="d-flex flex-column gap-2">
                    <label className="bold" htmlFor=""> Enter Role Name</label>
                    <input type="text" name="roleName" onChange={handleChange} className="w-100 m-auto p-2" value={editItem.roleName} placeholder="Enter Role Name" />
                    <label className="bold" htmlFor="">Check Permissions/Rights</label>
                  
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
                                    }}   name={item.permissionName} defaultChecked={selectedItems.find((elem)=>elem.permissionId == item.permissionId)} type="checkbox"/>
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
                   <textarea type="text" rows="5"name="description" value={editItem.description} className="w-100 m-auto p-2" onChange={handleChange} placeholder="enter some description" />
                </form>
    
    
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setUpdateRolePermissions(false)}>
                Close
              </Button>
              <Button variant="primary"  onClick={()=>{
                console.log("test")
                console.log
                fetch(`${import.meta.env.VITE_API_URL}/auth/v1/updateRole/${editItem.roleId}`,{
                    method : "PATCH",
                    credentials : "include",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({...editItem,permissions: selectedItems})
                }).then((res)=> res.json())
                .then((data)=>{
                    console.log(data)
                    toast(data.message);
                  setReload((prev) => prev+1)
                }).catch((err)=>{
                    console.log(err)
                    toast.error("Something went wrong");
                })
                
                setSelectedItems([]);
                setUpdateRolePermissions(false)
              }}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default Table;

const defaultColumns=[
    {id:1, title : "id"},
    {id:2, title: "name"},
    {id : 3 ,title: "description"},
    {id: 4 , title : "date"},
    {id: 5 , title : "date2"}
]