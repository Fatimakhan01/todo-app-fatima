"use client";

import { useEffect, useState } from "react";
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
import { updateTask } from "@/lib/actions/tasks/updateTask";

interface EditTaskDialogProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    dueDate: string | Date | null;
  };
}

export default function EditTaskDialog({
  task,
}: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");

      if (task.dueDate) {
        const formattedDate = new Date(task.dueDate)
          .toISOString()
          .split("T")[0];

        setDueDate(formattedDate);
      }
    }
  }, [task]);

  const handleUpdate = async () => {
    try {
      await updateTask({
        id: task.id,
        title,
        description,
        dueDate,
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-600">
              Edit Task
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
                onChange={(e) =>
                  setDescription(e.target.value)
                }
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
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}