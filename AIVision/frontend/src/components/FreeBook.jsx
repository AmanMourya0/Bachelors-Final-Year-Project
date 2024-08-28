import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from './Cards';
import axios from 'axios';
function FreeBook() {
  const [book,setBook]=useState([]);
  useEffect(()=>{
    const getBook=async()=>{
      try{
        const res =await axios.get("http://localhost:4001/book");
        console.log(res.data.filter((data)=>data.category==="Free"));
        setBook(res.data.filter((data)=>data.category==="Free"))
      } catch(error){
        console.log(error);
      }
    };
    getBook();
  },[])
  // const filterData=book.filter((data)=>data.category==="Free");
  // console.log(filterData);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white text-black dark:bg-black dark:text-white'>
    <div>
    <h1 className="font-semibold text-xl pb-2">Explore </h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas nulla magni consequatur amet culpa velit modi unde! Reprehenderit laborum tempore saepe, reiciendis perferendis repudiandae adipisci ad, deleniti nihil incidunt asperiores?</p>
    </div>
    <div>
    <Slider {...settings}>
        {book.map((item) => 
        (<Cards item={item} key={item.id} />
        )) }
      </Slider>
    </div>
    </div>
    </>
  )
}

export default FreeBook