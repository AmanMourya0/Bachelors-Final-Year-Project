import React, { useEffect, useState } from 'react'
import Cards from './Cards';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Courses() {
  // const detailuser=localStorage.getItem("Users");
  // console.log(detailuser);
  // const username=detailuser.fullname
  const [book,setBook]=useState([]);
  useEffect(()=>{
    const getBook=async()=>{
      try{
        const res =await axios.get("http://localhost:4001/book");
        // console.log(res.data);
        setBook(res.data)
      } catch(error){
        console.log(error);
      }
    };
    getBook();
  },[])
  return (
    <>
    <div className='mt-14 max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white text-black dark:bg-slate-900 dark:text-white'>
    <div className='items-center justify-center text-center'>
      <h1 className='py-6 text-2xl font-semibold md:text-4xl'>HELLO 
        {/* {username}  */}
         , WE ARE HAPPY TO <span className='text-pink-500'>SEE YOU</span>....</h1>
      <p className='mt-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere repellat iste temporibus. Natus itaque inventore doloremque nulla ducimus ipsa repellendus sed iusto eveniet corrupti. Ducimus minima beatae et? Labore, eos?</p>
      <Link to='/'><button className='bg-pink-500 px-3 py-2 rounded-md hover:bg-pink-600 duration-300 mt-6'>Back</button></Link>
    </div>
    <div className='mt-12 md:grid grid-cols-4 '>
    {book.map((item) => 
        (<Cards item={item} key={item.id} />
        )) }
    </div>
    </div>
    </>
  )
}

export default Courses