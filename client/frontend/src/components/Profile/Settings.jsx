import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { path } from "../../url";
import {message} from "antd"
const Settings = () => {
  const [values, setValues] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handelAddress=(e)=>{
      const {name,value}=e.target
      setValues({...values,[name]:value })

  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${path}/Api/v1/get-user-information`,
        { headers }
      );
      setValues({ address: response.data.address });
      setProfileData(response.data);
    };
    fetch();
  }, []);

  const handleUpdateAddress=async()=>{
try{
    const response= await axios.put(`${path}/Api/v1/update-address`,values,{headers})

     message.success(response.data.message)
}
   catch(err){
    message.error("Something went Wrong")
   }
  }
  return (
    <>
      {!profileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>

            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="address"
              name="address"
              value={values.address}
              onChange={handelAddress}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400" onClick={handleUpdateAddress}>Update</button>

          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
