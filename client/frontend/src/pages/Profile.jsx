import React, { useEffect, useState } from 'react'
import ProfilSideBar from '../components/Profile/ProfilSideBar'
import {Outlet} from "react-router-dom"
import {useSelector} from 'react-redux' 
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import MobileProfileNavbar from '../components/Profile/MobileProfileNavbar'
 import { path } from '../url'
 import { useLocation } from 'react-router-dom'
const Profile = () => {
   const location = useLocation();
  // const isLoggedIn =useSelector()
  const [profile,setProfile]=useState()
  const [orderhistory,setOrderhistory]=useState([])
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  
     useEffect(()=>{
   const fetch=async()=>{

     const response=await axios.get(`${path}/Api/v1/get-user-information`,{headers})
     setProfile(response.data)
     const orderresponse = await axios.get(`${path}/Api/v1/get-order-history`,{ headers });
     setOrderhistory(orderresponse.data.data)
   }
   fetch()
     },[])

     const isOrderHistoryPage = location.pathname === '/profile/orderHistory';
     const hasMoreThanThreeOrders = orderhistory.length > 3;
     const dynamicHeight = isOrderHistoryPage && hasMoreThanThreeOrders ? 'h-auto' : 'h-screen';

     const profilesetting=location.pathname==='/profile/settings'
     const  devicewidth=window.innerWidth >625
     const dynamicsettingheight=profilesetting && devicewidth ? 'h-screen':'h-auto'

  return (
    <div className={`bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row ${location.pathname=='/profile/settings'?dynamicsettingheight:dynamicHeight} py-8 gap-4 text-white`}>
      {!profile && <div className='w-full h-[100%] flex items-center justify-center'><Loader/></div>}
      {profile &&<> <div className='w-full md:w-1/6 h-auto lg:h-screen '><ProfilSideBar data={profile}/>
      
      <MobileProfileNavbar/>
      </div>
        <div className='w-full md:w-5/6 '><Outlet/></div></>}
    </div>
  )
}

export default Profile

 