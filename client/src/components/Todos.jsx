import React from "react";
import toast from "react-hot-toast";
import { SiTicktick } from "react-icons/si";
import { FiDelete } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import useSWR from "swr";

const fetcher = (url, options = {}) => { 
  fetch(url, {
    method: options.method || "GET",
    headers: {"Content-Type": "application/json"},
    credentials: "include",
    mode: "cors",
    body: options.body? JSON.stringify(options.body) : undefined,
  })
  .then((res) => res.json())
  .then((data) => data)
  .catch((err) => err)
}

const Todos = () => {
  const {data, error, isLoading, mutate} = useSWR("http://localhost:3000/api/todo", fetcher);
  if (error) { 
    return <h1 className="text-red-500 text-center text-2xl">Something went wrong</h1>
  }

  if (isLoading) { 
    return <h1 className="text-center text-2xl">Loading...</h1>
  }


  console.log(data);
  return (
    <div>
      <h1>Todos</h1>
    </div>
  );
};

export default Todos; 
