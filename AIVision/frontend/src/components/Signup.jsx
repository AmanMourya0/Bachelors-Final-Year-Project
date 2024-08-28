import React from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Login from './Login'
import axios from 'axios';
import toast from 'react-hot-toast';
function Signup() {
  const location=useLocation();
  const navigate=useNavigate();
  const from=location.state?.from?.pathname || '/courses'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async(data) => {
    const userInfo = {
      fullname:data.fullname,
      email:data.email,
      password:data.password,
    }
  
  await axios
  .post("http://localhost:4001/user/signup",userInfo)
  .then((res )=>{
    console.log(res.data)
    if (res.data){
      // alert("signUp successfull")
      toast.success('signUp successfull');
      setTimeout(() => {
        navigate(from,{replace:true});
      window.location.reload();
      }, 1000);
      
    }
    localStorage.setItem("Users", JSON.stringify(res.data.user));
  }).catch((err) => {
    if(err.response){
      
    }
    console.log("Error : ",err)
    toast.error("error: "+ err);
    setTimeout(() => {
      
    }, 3000);
  })
};
  return (
    <>
        <div className='flex h-screen justify-center items-center '>
        <div className="w-[600px]">
        <div className="modal-box bg-white text-black dark:bg-black dark:text-white rounded-md p-10">
            <h1 className='text-2xl text-center font-extrabold mb-10'>AI Vision</h1>
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link to={'/'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</Link>
            
            {/* <h3 className="font-bold text-lg">Login</h3> */}
            <div className='space-y-4'>
            <div className='space-y-2'>
                <label>Full Name</label><br />
                <input {...register("fullname", { required: true })} type="text" placeholder='Enter Your fullName' className='bg-white px-6 py- w-80 border rounded-sm'/><br />
                {errors.fullname && <span className='text-sm text-red-600'>*This field is required</span>}
                </div>
              <div className='space-y-2'>
                <label>Email</label><br />
                <input {...register("email", { required: true })} type="email" placeholder='Enter Your Email' className='bg-white px-6 py- w-80 border rounded-sm'/><br />
                {errors.email && <span className='text-sm text-red-600'>This field is required</span>}</div>
                <div className='space-y-2' >
                <label>Password</label><br />   
                <input {...register("password", { required: true })} type="password" placeholder='Password' className='bg-white px-6 py- w-80 border rounded-sm'/><br />
                {errors.password && <span className='text-sm text-red-500'>This field is required</span>}</div>
                <div className='flex justify-around py-3'>
                <button type="submit" className='bg-pink-500 px-4 py-1 border rounded-md border-none '>SignUp</button>
                <p>regitered?<button type="submit" className='text-blue-600 underline' onClick={()=>document.getElementById("my_modal_3").showModal()}>Login</button></p><Login/>
                </div>
            </div>
            </form>
        </div>
        </div>
    </div>
    </>
  )
}

export default Signup