import React, { useState, useEffect, useActionState } from "react";
//import components
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/userAction";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [state, formAction, isPending] = useActionState(login,{
    error: null,
    success: null
  });

  useEffect(() => { 
    if (state.success) { 
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [state.success])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

    return (
    <div className="h-screen flex justify-center items-center -translate-y-16"> 
        <form action={formAction} className="flex flex-col gap-6 max-w-xl w-full">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" value={formData.email}
            onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
          </div>
        
          {
            state.error && (
              <span className="message errorMsg">{state.error}</span>
            )
          }
          
          <Button disabled={isPending}>
            {
            isPending ? "Logging in..." : "Login"
            }
          </Button>
          <span className="text-[#64748b] text-center">Don't have an account? <Link to="/register" className="transition ease-in-out hover:cursor-pointer hover:text-[#000] hover:underline">
            Register
          </Link></span>
      </form>
    </div>
  );
};

export default Login;
