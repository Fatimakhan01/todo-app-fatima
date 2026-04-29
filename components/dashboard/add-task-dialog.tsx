"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTask } from "@/lib/actions/tasks/createTask";

export default function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSave = async () => {
    if (!title || !description || !dueDate) return;

    try {
      await createTask({
        title,
        description,
        dueDate,
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex ">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          Add Task
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-600">
              Add New Task
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Task Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSave}
              >
                Save Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}