"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Task } from "@/app/dashboard/page";

interface DeleteTaskDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task | null;
  deleteTask: (id: string) => void;
}

export default function DeleteTaskDialog({
  open,
  setOpen,
  selectedTask,
  deleteTask,
}: DeleteTaskDialogProps) {
  if (!selectedTask) return null;

  const handleDelete = async () => {
  try {
    await fetch(`/api/tasks/${selectedTask.id}`, {
      method: "DELETE",
    });

    deleteTask(selectedTask.id);
    setOpen(false);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">
            Delete Task
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete
          </p>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
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
  );
}