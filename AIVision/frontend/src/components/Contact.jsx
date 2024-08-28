import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"

function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => console.log(data)
      return (
        <>
           {/* <div className='max-h-screen mt-14 max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white text-black dark:bg-slate-900 dark:text-white'> */}
            <div className='flex h-screen justify-center items-center '>
            <div className="w-[600px]">
            <div className="modal-box bg-white text-black dark:bg-black dark:text-white rounded-md p-10">
                <h1 className='text-4xl text-center font-extrabold mb-10'>Contact Us</h1>
                <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <Link to={'/'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</Link>
                
                {/* <h3 className="font-bold text-lg">Login</h3> */}
                <div className='space-y-4'>
                <div className='space-y-2'>
                    <label>Name</label><br />
                    <input {...register("name", { required: true })} type="text" placeholder='Enter Your fullName' className='bg-white px-6 py- w-80 border rounded-sm'/><br />
                    {errors.name && <span className='text-sm text-red-600'>*This field is required</span>}
                    </div>
                  <div className='space-y-2'>
                    <label>Email</label><br />
                    <input {...register("email", { required: true })} type="email" placeholder='Enter Your Email' className='bg-white px-6 py- w-80 border rounded-sm'/><br />
                    {errors.email && <span className='text-sm text-red-600'>This field is required</span>}</div>
                    <div className='space-y-2' >
                    <label>Message</label><br />   
                    <input {...register("text", { required: true })} type="password" placeholder='Password' className='bg-white px-6 py- w-80 border rounded-sm'/><br />
                    {errors.text && <span className='text-sm text-red-500'>This field is required</span>}</div>
                    <div className='py-3'>
                    <button type="submit" className='bg-blue-600 px-4 py-1 border rounded-md border-none '>Submit</button>
                    {/* <p>regitered?<button type="submit" className='text-blue-600 underline' onClick={()=>document.getElementById("my_modal_3").showModal()}>Login</button></p><Login/> */}
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
        {/* </div> */}
        </>
      )
    }

export default Contact