import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {message} from "antd"
import { path } from "../url";

const Cart = () => {
  const [cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${path}/Api/v1/get-user-cart`,
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [cart]);

  const handledeleteItem     = async (bookid) => {
    const response = await axios.put(
      `${path}/Api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );

     message.success(response.data.message);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((item) => {
        total += item.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        `${path}/Api/v1/place-order`,
        { order: cart },
        { headers }
      );

      message.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (err) {
      message.error("Something Went Wrong")
    }
  };

  return (
    <div className={`bg-zinc-900 px-12 ${setCart.length>1 ?"h-auto":"min-h-screen"}  py-8`}>
      {!cart && <div className="w-full h-[100%] flex items-center justify-center"> <Loader /></div>}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100% flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart  
            </h1>
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((item, index) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={index}
            >
              <img
                src={item.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0 md:ml-3">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 ml-3 hidden md:block lg:hidden">
                  {item.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2  block md:hidden">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹{item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => handledeleteItem(item._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className="mt-4w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded mr-12 ">
            <h1 className="text-3xl text-zinc-200 font-semibold ">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200 ">
              <h2>
                {cart.length}
            
                {cart.length > 1 ? "books" : "book"}
              </h2>
              <h2>₹{Total}</h2>
            </div>
            <div className="w-[100%]  mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2  flex justify-center w-full font-semibold hover:bg-green-500 "
                onClick={handlePlaceOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;





