import React from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { path } from "../../url";

const BookCard = (props) => {
  let data = props.data;
  let favourites = props.favourites;

  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  }

  const handleRemoveFavourites=async()=>{
    const response=await axios.put(`${path}/Api/v1/delete-book-from-favourite`,{},{headers})
       alert(response.data.message)
  }
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
      <div>
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="recentbookimg" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl text-zinc-200 font-semibold">
            {data.title}
          </h2>
          <p className="mt-2  text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2  text-zinc-200 font-semibold text-xl">
            ₹ {data.price}
          </p>
         
        </div>
        </div>
      </Link>
      {favourites && (<button className="bg-yellow-50  font-semibold px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4" onClick={handleRemoveFavourites}>
            Remove From Favourites
          </button>)}
    </div>
  );
};

export default BookCard;
