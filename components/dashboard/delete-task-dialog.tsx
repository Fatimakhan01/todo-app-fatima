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
import { deleteTask } from "@/lib/actions/tasks/deleteTask";

interface DeleteTaskDialogProps {
  taskId: string;
}

export default function DeleteTaskDialog({
  taskId,
}: DeleteTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Delete Task
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}