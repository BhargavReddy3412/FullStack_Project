import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import { FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { path } from '../url';

const AllOrdersAdmin = () => {
  const [AllOrders,setAllOrders]=useState()
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get(`${path}/Api/v1//get-all-orders`,{headers})
       setAllOrders(response.data)
    }
    fetch()
  },[])
  return (
    <>
    {!AllOrders && <div className='h-[100%] flex items-center justify-center '><Loader/></div>}

    {AllOrders  && AllOrders.length>0 && <> 
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
             All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="">Price</h1>
            </div>

            <div className="w-[30%] md:w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]" >
              <h1 className=""><FaUserLarge /></h1>
            </div>
          </div>

          {AllOrders && AllOrders.map((item, index) => (
            <>
              <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
                <div className="w-[3%]">
                  <h1 className="text-center">{index + 1}</h1>
                </div>
                <div className="w-[22%]">
                  <Link
                    to={`/view-book-details/${item.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {item.book.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1 className="">{item.book.desc.slice(0, 50)} ...</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1 className="">{item.book.price}</h1>
                </div>

                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button className='hover:scale-105 transition-all duration-300'>
                    {item.status === "Order Placed" ? (
                      <div className="text-yellow-500">{item.status}</div>
                    ) : item.status === "Canceled" ? (
                      <div className="text-red-500">{item.status}</div>
                    ) : (
                     <div className='text-green-500'> item.status</div>
                    )}
                    </button>
                    <div className='flex'>
                      <select name="status" className='bg-gray-800'>
                       {
                        [
                          "Order Palced",
                          "Out for delivery",
                          "Delivered",
                          "Canceled"
                        ].map(()=>{
                          
                        })
                       }

                      </select>
                    </div>
                  </h1>
                </div>
                <div className="w-none md:w-[5%] hidden md:block">
                  <h1 className="text-sm">COD</h1>
                </div>
              </div>
            </>
          ))}
        </div>

                  
      </>}
    </>
  )
}

export default AllOrdersAdmin
