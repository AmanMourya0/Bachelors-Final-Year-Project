import React from 'react'
import NavBar from '../components/NavBar'
import Courses from '../components/Courses'
import Footer from '../components/Footer'

function Course() {
  return (
    <>
    <NavBar/>
    <div className='min-h-screen'><Courses/></div>
    <Footer/>
    </>
  )
}

export default Course