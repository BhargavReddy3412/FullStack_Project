import React,{useState,} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authActions } from '../store/auth'
import { useDispatch } from 'react-redux'
import {message} from "antd"
import { path } from '../url'
const Login = () => {

  const [logInValues,setLogInValues]= useState({username:"",password:""})
  const navigate=useNavigate()
  const dispatch=useDispatch()
     const handleChange=(e)=>{
     const {name, value}= e.target;
  
      setLogInValues({...logInValues,[name]:value})
     }
  
     const handleLogIn=async ()=>{
      try{
            if(logInValues.username===""|| logInValues.password===""){
              message.error("All fields are Required")
            }
            else{
              const response=await axios.post(`${path}/Api/v1/sign-in`,logInValues)
              console.log(response.data)
              dispatch(authActions.login())
              dispatch(authActions.changeRole(response.data.role))
              localStorage.setItem("id",response.data.id)
              localStorage.setItem("token",response.data.token)
              localStorage.setItem("role",response.data.role)
              message.success("Login Successfully Done")
              navigate("/")
            }
      }
      catch(err){
    message.error(err.response.data.message)
      }
    }

    const handleGuestLogin=async ()=>{
          
    const guestCredentials={username:"guest",password:"123123"}
      try{
            
              const response=await axios.post(`${path}/Api/v1/sign-in`,guestCredentials)
              console.log(response.data)
              dispatch(authActions.login())
              dispatch(authActions.changeRole(response.data.role))
              localStorage.setItem("id",response.data.id)
              localStorage.setItem("token",response.data.token)
              localStorage.setItem("role",response.data.role)
              message.success("Login Successfully Done")
              navigate("/")
      }
      catch(err){
    message.error(err.response.data.message)
      }
    }

  return (
    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
      <p className='text-zinc-200 text-xl'>Login</p>
      <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-zinc-400'>Username</label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='username' name="username" required value={logInValues.username} onChange={handleChange}/>
          </div>

          <div className='mt-4'>
            <label htmlFor='' className='text-zinc-400'>Password</label>
            <input type="password" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Password' name='password' required value={logInValues.password} onChange={handleChange} />
          </div>
          <div className='mt-4'>
            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded' onClick={handleLogIn}>LogIn</button>
          </div>
          <div className='mt-4'>
            <button className='w-full bg-gray-500 text-white font-semibold py-2 rounded' onClick={handleGuestLogin}>Guest Login</button>
          </div>
          <p className='flex mt-4 items-center justify-center text-zinc-200 font-semibold'>Or</p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
            Don't have an Account &nbsp;
            <Link to="/SignUp" className='hover:text-blue-500'><u>Sign Up</u></Link>
          </p>
      </div>

      </div>
    </div>
  )
}
export default Login

 
 