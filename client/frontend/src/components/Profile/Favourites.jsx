 import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Bookcard from "../BookCard/BookCard"
import { path } from '../../url'

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState("")
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${path}/Api/v1/get-favourite-books`, { headers })
      setFavouriteBooks(response.data.data)
    }
    fetch()
  }, [favouriteBooks])

  return (
    <>
      {favouriteBooks.length === 0 && (
        <div className='text-4xl font-semibold text-zinc-500 h-[100%] flex flex-col items-center sm:justify-between md:justify-around w-full'>
          No Favourite Books
          <img
            className='w-full max-w-xs object-contain md:max-w-sm lg:max-w-md rounded opacity-40'
            src="https://img.freepik.com/premium-vector/no-favorites_878233-548.jpg?w=2000"
            alt="favourite image"
          />
        </div>
      )}

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {favouriteBooks && favouriteBooks.map((item, index) => (
          <div key={index}>
            <Bookcard data={item} favourites={true} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Favourites
