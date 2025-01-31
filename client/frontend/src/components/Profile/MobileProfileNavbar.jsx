import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
const MobileProfileNavbar = () => {

  const role=useSelector((state)=>state.auth.role)
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleLogout = () => {
      dispatch(authActions.logout());
      dispatch(authActions.changeRole("user"));
      localStorage.clear("id");
      localStorage.clear("token");
      localStorage.clear("role");
      navigate("/");
    };

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
           <button
              className="hidden md:flex"
              onClick={handleLogout}
            >
              Log Out
            </button>

    </div>) }

    {role==="admin" &&( <div className="w-full flex lg:hidden items-center justify-between mt-4">
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
