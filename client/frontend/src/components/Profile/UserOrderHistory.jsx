 import React, { useEffect, useState } from "react";
 import axios from "axios";
 import Loader from "../Loader/Loader";
 import { Link } from "react-router-dom";
 import { path } from "../../url";

 const UserOrderHistory = () => {
   const [orderHistory, setOrderHistory] = useState();
   const headers = {
     id: localStorage.getItem("id"),
     authorization: `Bearer ${localStorage.getItem("token")}`,
   };

   useEffect(() => {
     const fetch = async () => {
       const response = await axios.get(
         `${path}/Api/v1/get-order-history`,
         
         { headers }
       );
       setOrderHistory(response.data.data);
     };
     fetch();
   }, []);
   return (
     <>
       {!orderHistory && (
         <div className="flex items-center justify-center h-[100%]">
           <Loader />
         </div>
       )}
       {orderHistory && orderHistory.length === 0 && (
         <div className="h-[40vh] p-4 text-zinc-100">
           <div className="h-[100%] flex flex-col items-center justify-center">
             <h1 className="text-2xl md:text-5xl font-semibold text-zinc-500 mb-8">
               No Order History
             </h1>
           </div>
         </div>
       )}

       {orderHistory && orderHistory.length > 0 && (
         <div className="h-[100%] p-0 md:p-4 text-zinc-100">
           <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
             Your Order History
           </h1>
           <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
             <div className="w-[3%]">
               <h1 className="text-center">Sr.</h1>
             </div>
             <div className="w-[22%]">
               <h1 className="">Books</h1>
             </div>
             <div className="w-[45%]">
               <h1 className="">Description</h1>
             </div>
             <div className="w-[9%]">
               <h1 className="">Price</h1>
             </div>

             <div className="w-[16%]">
               <h1 className=""> </h1>
             </div>
             <div className="w-none md:w-[5%] hidden md:block">
               <h1 className="">Mode</h1>
             </div>
           </div>

           {orderHistory.filter((item)=>item.book !==undefined).map((item, index) => (
             <>
               <div className="bg-zinc-800 w-full rounded py-2  px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer">
                 <div className="w-[3%]">
                   <h1 className="text-center">{index + 1}</h1>
                 </div>
                 <div className="w-[22%]">
                   <Link
                     to={`/view-book-details/${item.book._id}`}
                     className={`hover:text-blue-300 text-sm sm:text-base`}
                   >
                     {item.book.title}
                   </Link>
                 </div>
                 <div className="w-[45%]">
                   <h1 className="">{item.book.desc.slice(0, 50)} ...</h1>
                 </div>
                 <div className="w-[9%]">
                   <h1 className="">{item.book.price}</h1>
                 </div>

                 <div className="w-[16%]">
                   <h1 className="font-semibold text-green-500">
                     {item.status === "Order Placed" ? (
                       <div className="text-yellow-500">{item.status}</div>
                     ) : item.status === "Canceled" ? (
                       <div className="text-red-500">{item.status}</div>
                     ) : (
                       item.status
                     )}
                   </h1>
                 </div>
                 <div className="w-none md:w-[5%] hidden md:block">
                   <h1 className="text-sm">COD</h1>
                 </div>
               </div>
             </>
           ))}
         </div>
       )}
     </>
   );
 };

 export default UserOrderHistory;





 