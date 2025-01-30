import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MobileProfileNavbar = () => {

  const role=useSelector((state)=>state.auth.role)
  

  return (

    <>
  
    {role==="user" &&( <div className="w-full flex md:flex-col gap-4 lg:hidden items-center justify-between mt-4">
      <Link
        to="/profile"
        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
      >
        Favourites
      </Link>
      <Link
        to="/profile/orderHistory"
        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
      >
        Order History
      </Link>
      <Link
        to="/profile/settings"
        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
      >
        Settings
      </Link>
           {/* <button
              className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300 sm:hiiden"
              // onClick={handleLogout}
            >
              Log Out
            </button> */}

    </div>) }

    {role==="admin" &&( <div className="w-full flex lg:hidden items-center justify-between mt-4">
      {/* <Link
        to="/profile"
        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
      >
         All Orders
      </Link> */}
      <Link
        to="/profile/add-book"
        className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300"
      >
        Add Book
      </Link>

    </div>) }
    </>);
};

export default MobileProfileNavbar;
