import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom';
import {message} from "antd"
import { path } from '../url';
const UpdateBook = () => {
  const  {id}=useParams()
  const navigate=useNavigate()

    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid:id,
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
      };
    
      const handleAddBook = async () => {
        try {
          if (
            Data.url === "" ||
            Data.title === "" ||
            Data.author === "" ||
            Data.price === "" ||
            Data.desc === "" ||
            Data.language===""
          ) {
            message.error("All Fields are Required");
          } else {
            const response = await axios.put(
              `${path}/Api/v1/update-book`,
              Data,
              { headers }
            );
    
            setData({
              url: "",
              title: "",
              author: "",
              price: "",
              desc: "",
              language: "",
            });
            message.success(response.data.message);
            navigate(`/view-book-details/${id}`)
          }
        } catch (err) {
          message.error(err.response.data.message);
        }
        
      };

      useEffect(() => {
        const fetch = async () => {
          const response = await axios.get(
            `${path}/Api/v1/get-book-by-id/${id}`
          );
          setData(response.data.data);
        };
        fetch();
      }, []);
    
    
      return (
        <div className=" bg-zinc-900 h-[100%] p-0 md:p-4">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Update Book
          </h1>
    
          <div className="p-4 bg-zinc-800 rounded">
            <div>
              <label htmlFor="" className="text-zinc-400">
                Image
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="URL of Image"
                name="url"
                required
                value={Data.url}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-zinc-400">
                Title of Book
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="Title of Book"
                name="title"
                required
                value={Data.title}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-zinc-400">
                Author of Book
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="Author of Book"
                name="author"
                required
                value={Data.author}
                onChange={handleChange}
              />
            </div>
    
            <div className="mt-4 flex gap-4">
              <div className="w-3/6">
                <label htmlFor="" className="text-zinc-400">
                  Language
                </label>
                <input
                  type="text"
                  className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="Language of Book"
                  name="language"
                  required
                  value={Data.language}
                  onChange={handleChange}
                />
              </div>
              <div className="w-3/6">
                <label htmlFor="" className="text-zinc-400">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                  placeholder="Price of Book"
                  name="price"
                  required
                  value={Data.price}
                  onChange={handleChange}
                />
              </div>
            </div>
    
            <div className="mt-4">
              <label htmlFor="" className="text-zinc-400">
                Description of Book
              </label>
              <textarea
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                rows="5"
                placeholder="Description Of Book"
                required
                name="desc"
                value={Data.desc}
                onChange={handleChange}
              />
            </div>
            <button
              className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all"
              onClick={handleAddBook}
            >
              Update Book
            </button>
          </div>
        </div>
      );
}

export default UpdateBook
