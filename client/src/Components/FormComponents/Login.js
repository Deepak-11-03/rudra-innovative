import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Form.css'

function Login() {
  const navigate = useNavigate()
  const [user,setUser]=useState({
    email:"",
    password:""
  })

  const handleInput=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }

  const formSubmit =async(e)=>{
    e.preventDefault();
    let api = await fetch('http://localhost:3001/login',{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-type":"Application/json"
      },
      body:JSON.stringify(user)
    })
    let result = await api.json();
    if(result.status === true){
      localStorage.setItem("token",result.token)
      localStorage.setItem("name",result.name)
      navigate('/')
    }
    else{
      alert(result.msg)
    }

  }
  return (
    <div className=' w-[100vw] h-full bg-[#ffffff] '>
        <form onSubmit={formSubmit} className=' form m-auto mt-12 p-6 pb-12 w-[22rem] h-max flex flex-col gap-2 rounded-md' >
          <h1 className=' p-2 mb-5 text-center text-2xl '>Welcome Back !</h1>
            <input type="email" name="email"  required placeholder='Enter Email' autoFocus value={user.email} onChange={handleInput} />
            <input type="text" name="password" required placeholder='Enter Password' value={user.password} onChange={handleInput}/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login
