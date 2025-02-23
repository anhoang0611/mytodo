import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fetcher from "../actions/fetcher";

const Profile = () => {
    const navigate = useNavigate();

    async function handleLogout() { 
        try {
            const response = await fetcher("http://localhost:3000/api/user/logout", {
            method: "POST",
            credentials: "include",
        });

        if (response.error) { 
            throw new Error("Failed to logout");
        }

            toast.success("Logged out successfully");
            // after logout, redirect to login page
        navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <CircleUserRound className="transition ease-in-out hover:cursor-pointer hover:text-primary"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile;