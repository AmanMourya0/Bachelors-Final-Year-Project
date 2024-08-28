import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios';
import toast from 'react-hot-toast';
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async(data) => {
    const userInfo = {
      email:data.email,
      password:data.password,
    }
  
  await axios
  .post("http://localhost:4001/user/login",userInfo)
  .then((res )=>{
    console.log(res.data)
    if (res.data){
     
      toast.success('Successfully Logged in!');
      document.getElementById("my_modal_3").close()
      
      setTimeout(()=>{
        window.location.reload();
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      
      },1000)
      
      
    }
    
  }).catch((err) => {
    if(err.response){
      
    }
    console.log("Error : ",err)
    toast.error("error: "+ err);
    setTimeout(()=>{
        
    },3000)
  })
};
  return (
    <div>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-black">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link 
            to='/' 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={()=>document.getElementById("my_modal_3").close()}
            >✕</Link>
            
            <h3 className="font-bold text-lg mb-5">Login</h3>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label>Email</label><br />
                <input {...register("email", { required: true })} type="email" placeholder='Enter Your Email' className='bg-white text-black px-6 py- w-80 border rounded-sm'/><br />
                {errors.email && <span className='text-sm text-red-600'>This field is required</span>}
                </div>
                <div className='space-y-2' >
                <label>Password</label><br />
                <input {...register("password", { required: true })} type="password" placeholder='Password' className='bg-white text-black px-6 py- w-80 border rounded-sm text-black'/><br />
                {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                </div>
                <div className='flex justify-around'>
                <button className='bg-pink-500 px-4 py-1 border rounded-md border-none ' type='submit'>Login</button>
                <p>not regitered?<Link className='text-blue-600 underline' to={'/SignUp'}>SignUp</Link></p>
                </div>
            </div>
            </form>
        </div>
        </dialog>
    </div>
  )
}

export default Login