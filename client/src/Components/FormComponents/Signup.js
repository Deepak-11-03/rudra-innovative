import { useState } from 'react'
import './Form.css'
import {useNavigate} from 'react-router-dom'

function Signup() {
    const navigate=useNavigate()
    const [user,setUser]=useState({
        name:"",
        email:"",
        phone:"",
        password:""
      })
    
      const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
      }

    const formSubmit =async(e)=>{
        e.preventDefault();
        let api = await fetch('http://localhost:3001/signup',{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-type":"Application/json"
            },
            body:JSON.stringify(user)
          })
          let result = await api.json();
          if(result.status === true){
            setUser({name:"",email:"",phone:"",password:""})
            alert(result.msg)
            navigate('/login')
          }
          else{
            alert(result.msg)
          }
    }
  return (
    <div className=' w-[100vw] h-full bg-[#ffffff] '>
        <form onSubmit={formSubmit} className=' form m-auto mt-12 p-6 pb-12 w-[22rem] h-max flex flex-col gap-2 rounded-md' >
          <h1 className=' p-3 text-center text-2xl '>Signup Here</h1>
            <input type="text" name="name"  required placeholder='Enter Name' autoFocus   value={user.name} onChange={handleInput}/>
            <input type="email" name="email"   required placeholder='Enter Email'  value={user.email} onChange={handleInput}/>
            <input type="number" name="phone"   required placeholder='Enter Phone'  value={user.phone} onChange={handleInput}/>
            <input type="text" name="password"  required placeholder='Enter Password'  value={user.password} onChange={handleInput}/>
            <button type='submit'>Signup</button>
        </form>
    </div>
  )
}

export default Signup
