import React from "react";
//import components
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";


const Login = () => {
    return (
    <div className="h-screen flex justify-center items-center -translate-y-16"> 
        <form action="" className="flex flex-col gap-6 max-w-xl w-full">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" />
          </div>
          <Button type="submit">Login</Button>
          <span className="text-[#64748b] text-center">Don't have an account? <Link to="/register" className="transition ease-in-out hover:cursor-pointer hover:text-[#000] hover:underline">
            Register
          </Link></span>
      </form>
    </div>
  );
};

export default Login;
