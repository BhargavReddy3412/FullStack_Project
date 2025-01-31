import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfilSideBar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role=useSelector((state)=>state.auth.role)
  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    navigate("/");
  };
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-around h-auto lg:h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} className="h-[12vh]" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300 ">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"> </div>
      </div>


     {role ==="user" && (<div className="w-full flex-col items-center justify-center hidden lg:flex ">
      
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center  hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Settings
        </Link>
        <button
      className="hover:bg-white hover:text-zinc-900 hover:w-20 hover:rounded"
        onClick={handleLogout}
      >
        Log Out
        <FaArrowRightFromBracket className="ms-4" />
      </button>
      </div>)} 
  
      {role==="admin" &&(<div className="w-full flex-col items-center justify-center hidden lg:flex">
        <button
        onClick={handleLogout}
        className="flex border border-blue-500 px-2 py-1 rounded hover:bg-red-500"
      >
        Log Out
        <FaArrowRightFromBracket className="ms-4" />
      </button>

      </div>) }

      <button
        className="bg-zinc-900 w-3/6 sm:hidden lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
        onClick={handleLogout}
      >
        Log Out
        <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
};

export default ProfilSideBar;



 