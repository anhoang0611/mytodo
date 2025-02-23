import React from "react";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { SiTicktick } from "react-icons/si";
import { FiDelete } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { CircleUserRound } from "lucide-react";
import useSWR from "swr";

const fetcher = (url, options = {}) => { 
  return fetch(url, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
    .then((res) => res.json());
}

const Todos = () => {
  const {data, error, isLoading, mutate} = useSWR("http://localhost:3000/api/todo", fetcher);
  if (error) { 
    return <h1 className="text-red-500 text-center text-2xl">Something went wrong</h1>
  }

  if (isLoading) { 
    return <h1 className="text-center text-2xl">Loading...</h1>
  }

  function handleError(error) { 
    toast.error(error);
    throw new Error(error);
  }

  //add todo
  async function handleAddTodo(e) { 
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    
    console.log(title);
    
    if (!title.trim().length ) { 
      toast.error("Title is required");
      return;
    }
    
    const newTodo = {
      title: `${title} adding...`,
      _id: Date.now().toString(),
      isCompleted: false,
    }
    
    async function addTodo() { 
      const response = await fetcher("http://localhost:3000/api/todo", {
        method: "POST",
        body: {title},
       
      });

      if (response.error) {
        handleError(response.error.message);
      }

      return [...data, response];
    }

    await mutate(addTodo, {
      optimisticData: [...data, newTodo],
      revalidate: true,
      rollbackOnError: true,
    })
    e.target.reset();
  }
  //delete todo
  async function deleteTodo(id) { 
    toast.success("Deleted data");
    await mutate(async () => { 
      const response = await fetcher(`http://localhost:3000/api/todo/${id}`, {
        method: "DELETE",
      });

      if (response.error) { 
        handleError(response.error);
      }

      return data.filter((todo) => todo._id !== id);
    }, {
      optimisticData: data.filter((todo) => todo._id !== id),
      revalidate: false,
      rollbackOnError: true,
    })
  }

  //complete todo
  async function handleComplete(id, isCompleted) { 
    await mutate(async () => { 
      const response = await fetcher(`http://localhost:3000/api/todo/${id}`, {
        method: "PUT",
        body: {isCompleted: !isCompleted},
      })

      if (response.error) { 
        handleError(response.error);
      }
      
      return data.map((todo) =>
      {
        if (todo._id === id) {
        return {...todo, isCompleted: !isCompleted}
        }
        return todo;
      })
    }, {
      optimisticData: data.map((todo) => {
        if (todo._id === id) {
          return {...todo, isCompleted: !isCompleted}
        }
        return todo;
      }),
      rollbackOnError: true,
      revalidate: false,
    })
  }
  return (
    <div className="mx-auto mt-20 max-w-lg px-4 w-full flex flex-col gap-6">
      <div>
        <CircleUserRound/>
      </div>
      <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-4xl text-center mb-4 text-transparent bg-clip-text">Todos App</h1>
      <form onSubmit={handleAddTodo} className="flex gap-4 items-center">
        <Input type="text" placeholder="Add a todo" name='title' id='title' required className='shadow-md' />
        <button className="h-9 rounded-md border border-input bg-transparent px-3 text-base flex items-center hover:bg-primary transition ease-linear group">
          <Plus size={20} className="transition ease-linear group-hover:text-white" />
        </button>
      </form>

      {
        data?.length ? (
          <div className="shadow-md border-2 border-input bg-transparent flex flex-col ">
            {
              data.map((todo,index) => (
                <div key={index} className="flex h-10 items-center w-full p-4">
                  <span className={`flex-1 px-3 ${todo.isCompleted ? "line-through text-[#63657b]" : ""}`}>{todo.title}</span>
                  <div className="flex px-3 gap-2">
                    <SiTicktick onClick={() => handleComplete(todo._id,todo.isCompleted)} className={`transition ease-in-out hover:cursor-pointer ${todo.isCompleted ? "text-primary" : "text-slate-400"} `} />
                    <CiEdit className="iconHover" />
                    <FiDelete className="iconHover" onClick={() => deleteTodo(todo._id)} />
                  </div>
                </div>
              ))
            }
          </div>
        ) : <span>"You don't have any todos"</span>
          
        
      }
    </div>
  );
};

export default Todos; 
