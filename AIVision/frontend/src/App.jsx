import React from 'react'
import Home from './home/Home'
import { Navigate, Route, Routes } from 'react-router-dom';
import Course from './course/Course';
import Signup from './components/Signup';
import ContactUs from './contactUs/ContactUs';
import Aboutus from './Aboutus/Aboutus';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';

const App = () => {
  const [authUser,setAuthUser]=useAuth();

  return (
    <>
    <div className=' text-black dark:bg-slate-900 dark:text-white light:bg-slate-100 '>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Courses" element={
        authUser?
        <Course/>
        :
        <Navigate to={"/signup"}/>
        } />
      <Route path='/SignUp' element={<Signup/>} />
      <Route path='/ContactUs' element={<ContactUs/>} />
      <Route path='/AboutUs' element={<Aboutus/>} />
    </Routes>
    <Toaster />
    </div>
    </>
  )
}

export default App