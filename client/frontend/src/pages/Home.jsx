 import React from 'react'
 import Hero from '../components/Home/Hero'
import RecentlyAddedBooks from '../components/Home/RecentlyAddedBooks'
 
 const Home = () => {
   return (
     <div className='bg-zinc-900 text-white px-10 py-8'>
       <Hero/>
       <RecentlyAddedBooks/>
     </div>
   )
 }
 
 export default Home
 