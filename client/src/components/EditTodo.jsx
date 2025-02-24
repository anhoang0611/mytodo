import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const EditTodo = ({ todo, mutate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/todo/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) throw new Error("Update failed");
      
      mutate();
      toast.success("Todo updated successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CiEdit
          className="iconHover"
          role="button"
          aria-label="Edit todo"
          tabIndex="0"
          onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
        />
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            aria-label="Edit todo input"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodo;