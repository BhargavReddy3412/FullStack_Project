import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Bookcard from "../BookCard/BookCard"
import { path } from '../../url'

const Favourites = () => {
 const [favouriteBooks,setFavouriteBooks]= useState("")
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(()=>{
    const fetch= async()=>{
      const response=await axios.get(`${path}/Api/v1/get-favourite-books`,{headers})
     setFavouriteBooks(response.data.data)
    }
    fetch()
  },[favouriteBooks])
  return (
    <>
      {favouriteBooks.length===0 && <div className='text-5xl font-semibold text-zinc-500 h-[100%] flex items-center justify-center w-full'>No Favoutite Books</div>}

    <div className='grid grid-cols-4 gap-4'>
     {favouriteBooks && favouriteBooks.map((item,index)=><div key={index  }><Bookcard data={item} favourites={true}/></div>)}
    </div>
    </>
  )
}

export default Favourites
