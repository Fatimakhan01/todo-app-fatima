"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/app/dashboard/page";

interface TaskTableProps {
  tasks: Task[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

export default function TaskTable({
  tasks,
  setOpen,
  setEditOpen,
  setSelectedTask,
}: TaskTableProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white shadow-sm rounded-lg border">
        <div className="flex justify-end p-6">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setOpen(true)}
          >
            Add Task
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTask(task);
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}