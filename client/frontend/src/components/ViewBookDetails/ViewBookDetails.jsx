import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import {Link, useNavigate , useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { path } from "../../url";
import { message } from "antd"

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const navigate=useNavigate()

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${path}/Api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }
  const handleFavourites=async()=>{
    try{
    const response=await axios.put(`${path}/Api/v1/add-book-to-favourite`,{},{headers})

    message.success(response.data.message)
    navigate("/all-books")
    }
    catch(err){
      message.error("Something went Wrong")
    }
  }

  const handleAddToCart=async()=>{
    const response=await axios.put(`${path}/Api/v1/add-to-cart`,{},{headers})
try{
    message.success(response.data.message)

    navigate("/all-books")
  }
  catch(err){
    message.error("Something went Wrong")
  }
  }


  

  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/6">
            <div className=" flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded  ">
              <img
                src={Data.url}
                alt="Book Info"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />

              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0 items-center justify-between lg:justify-start">
                  <button className="bg-white rounded lg:rounded-full text-xl md:text-3xl p-3 text-red-500 flex items-center justify-center" onClick={handleFavourites}>
                    <FaHeart />
                    <span className="ms-4 block lg:hidden">Add To Fav</span>
                  </button>
                  <button className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-xl md:text-3xl p-3  lg:mt-8 bg-blue-500 flex items-center justify-center" onClick={handleAddToCart}>
                    <FaCartShopping />
                    <span className="ms-4 block lg:hidden">Add To Cart</span>
                  </button>
                </div>
              )}

              {isLoggedIn === true && role === "admin" && (
                <div className="flex  flex-col md:flex-row lg:flex-col mt-4 lg:mt-0 items-center justify-between lg:justify-start">
                  <Link to={`/updateBook/${id}`} className="bg-white rounded lg:rounded-full text-xl md:text-3xl  p-3 flex items-center justify-center">
                  <FaEdit />  
                    <span className="ms-4 block text-xl md:text-3xl  lg:hidden">Edit</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-full  lg:w-3/6">
            <h1 className="text-2xl md:text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">{Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="m-3" />
              {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-2xl md:text-3xl font-semibold">
              {" "}
              Price ₹{Data.price}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
