import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import { path } from '../url'
const AllBooks = () => {

  const [Data,setData]=useState()

useEffect(()=>{

    const fetch=async()=>{
      const response= await axios.get(`${path}/Api/v1/get-all-books`)
      setData(response.data.data)
    }
    fetch()
},[])
  return (
    <div className={`bg-zinc-900 ${Data && Data.length > 1 ? "h-auto" : "min-h-screen"} px-12 py-8`}>
            <h4 className='text-2xl md:text-3xl text-yellow-100'>All Books</h4>
      {!Data && <div className='flex items-center justify-center my-8'><Loader/></div>}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8'>
       {Data && Data.map((item,index)=>(
        <div key={index}><BookCard data={item}/> </div>
       ))}
      </div>
    </div>
  )
}

export default AllBooks


 