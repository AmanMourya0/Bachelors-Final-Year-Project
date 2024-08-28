import React from 'react'
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

function Logout() {
    const [authUser,setAuthUser]=useAuth();
    const logOut=()=>{
        try{
        setAuthUser({
            ...authUser,
            user:null
        })
            localStorage.removeItem("Users")
            
            toast.success("Logout succesfully");
            
            setTimeout(()=>{
                window.location.reload();
            },2000)
            
            // window.location.reload()
        } catch(error){
            toast.error("error: "+ error)
            setTimeout(()=>{
            },3000)

        }
        
    };
    // logOut();
  return (
    <div>
        <button className="bg-white text-black dark:bg-black dark:text-white dark:hover:bg-orange-600 dark:hover:text-black px-3 py-2 rounded-md hover:bg-orange-600 hover:text-white duration-300 cursor:pointer"
        onClick={logOut}
        >Logout</button>
    </div>
  )
}

export default Logout