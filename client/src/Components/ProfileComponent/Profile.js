import React, { useEffect, useState } from 'react'
import DeleteProfileBox from './DeleteProfileBox'


function Profile() {
    const[edit,setEdit]=useState(false)
    const[updating,setUpdating] =useState(false)
    const [user,setUser]=useState({
        name:"",
        email:"",
        phone:"",
        password:""
    })
    const handleInput =(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
   

    const getProfile= async()=>{
        let api = await fetch("http://localhost:3001/profile",{
            method:"GET",
            mode:"cors",
            headers: {
                authorization: localStorage.getItem('token')
              },
        })
        let result = await api.json();
        if(result.status === true){
            setUser(result.profile)
        }
        else{
            alert(result.msg)
        }
        
    }
    useEffect(()=>{
        getProfile()  //getting user profile when component render
    },[])

    const updateDetails=async(e)=>{
        e.preventDefault();
        setUpdating(true)
        let api = await fetch("http://localhost:3001/update",{
            method:"PUT",
            mode:"cors",
            headers:{
                authorization:localStorage.getItem("token"),
                "Content-type":"Application/json"
            },
            body:JSON.stringify(user)
        })
        let result = await api.json();
        if(result.status===true){
            alert(result.msg)
            setEdit(false)
            setUpdating(false)
        }
        else{
            alert(result.msg)
            setUpdating(false)
        }
    }




  return (
    <main className='w-4/5 h-full p-8 m-auto border'>
        <h1 className='text-3xl text-center'>Update Profile</h1>
        <button onClick={()=>setEdit(!edit)} className="float-right">{edit ? "Cancel" :"Edit"}</button>
        <form onSubmit={updateDetails} className='w-[25rem] m-auto mt-10 flex flex-col gap-2'>
        <label htmlFor="name">Name</label>
            <input type="text" name='name' placeholder='Your Name' value={user.name} onChange={handleInput} disabled={!edit} />
        <label htmlFor="phone">Phone</label>
            <input type="text" name='phone' placeholder='Your phone' value={user.phone} onChange={handleInput} disabled={!edit}/>
        <label htmlFor="email">Email</label>
            <input type="text" name='email' placeholder='Your Email' value={user.email} onChange={handleInput} disabled={!edit}/>
            <button type='submit' disabled={updating}>Update</button>
        </form>
        <br />
        <br />
        <DeleteProfileBox/>
    </main>
  )
}

export default Profile
