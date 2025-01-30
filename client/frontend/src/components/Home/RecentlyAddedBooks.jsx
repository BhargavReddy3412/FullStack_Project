import React, { useEffect, useState } from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'
import { path } from '../../url'
const RecentlyAddedBooks = () => {

const [Data,setData]=useState()

useEffect(()=>{

    const fetch=async()=>{
      const response= await axios.get(`${path}/Api/v1/get-recent-books`)
      setData(response.data.data)
    }
    fetch()
},[])

  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
      {!Data && <div className='flex items-center justify-center my-8'><Loader/></div>}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
       {Data && Data.map((item,index)=>(
        <div key={index}><BookCard data={item}/> </div>
       ))}
      </div>
    </div>
  )
}

export default RecentlyAddedBooks
