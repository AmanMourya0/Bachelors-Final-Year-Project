import React from 'react'
import Eye from '../../public/eyeimage.webp'

import { Link } from 'react-router-dom'
function Banner() {
  return (
    <>
    <div className=' max-w-screen-2xl container mx-auto md:px-20 px-14 bg-white text-black dark:bg-black dark:text-white flex flex-col md:flex-row py-6'>
      <div className='w-full md:w-1/2 order-2 md:order-1 space-y-7 md:mt-32'>
        {/* <div className='space-y-8'> */} 
        <h1 className='text-4xl font-bold'>Welcome to Real-Time Object and {" "}
        <span className="text-cyan-400 hover:text-orange-500">Scene Detection!!!</span></h1>
        <p className="text-sm font-semibold md:text-xl"> 
              Whether you're exploring new environments, monitoring live video feeds, or simply 
              curious about the world around you, this app helps you better understand your surroundings 
              by automatically identifying objects and narrating the detected scenes for you.
            </p>
            <label className="bg-white dark:bg-black input input-bordered flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className=" grow" placeholder="Email" />
            </label>
            <Link to='/SignUp' className="btn btn-secondary font-bold hover:  bg-cyan-400 hover:bg-orange-500 border-none">Get Started</Link>
            {/* </div> */}
      </div>
    <div className='w-full order-1 md:w-1/2 grid place-items-center'>
      {/* <img src={BannerLogo} className='hover:scale-105 dark:hover:drop-shadow-[0_25px_25px_rgba(220,220,220,0.17)] hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] duration-300 w-100 h-100' alt="bannerLogo" /> */}
      <img src={Eye} className='ml-16 mt-14 w-90 h-96 hover:scale-105 shadow-none shadow-cyan-900 hover:shadow-xl hover:shadow-cyan-300 duration-700 rounded-badge' alt="bannerLogo" />
    </div>
    </div>
    </>
  )
}

export default Banner