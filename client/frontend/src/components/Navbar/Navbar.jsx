import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [MobileNav, setMobileNav] = useState("hidden");

  const role= useSelector((state) => state.auth.role);
  

  if (isLoggedIn === false) {
    links.splice(2, 2);
  }

  if(isLoggedIn == true && role==="admin"){
    {
      links.splice(3,1)
    }
  }
  if(isLoggedIn == true && role==="user"){
    {
      links.splice(4,1)
    }
  }
  return (
    <>
      <nav className="z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://tse2.mm.bing.net/th?id=OIP.20Z2L1I8ovr_AYi6EIUGcwHaD-&pid=Api&P=0&h=180"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, index) => (
              <div className="flex items-center">
                {item.title === "Profile" ||item.title === "Admin Profile" ? (
                  <Link
                    to={item.link}
                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    key={index}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className="hover:text-blue-500 border-blue-500 transition-all duration-300"
                    key={index}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                signUp
              </Link>
            </div>
          )}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, index) => (
          <Link
            to={item.link}
            className={`${MobileNav} text-white text-4xl mb-4 font-semibold hover:text-blue-500 transition-all duration-300`}
            key={index}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {item.title}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/LogIn"
              className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              Login
            </Link>
            <Link
              to="/SignUp"
              className={`${MobileNav} px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded  hover:bg-white hover:text-zinc-800 transition-all duration-300`}
            >
              signUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
