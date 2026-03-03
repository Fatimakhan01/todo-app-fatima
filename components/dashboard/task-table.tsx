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
}

export default function TaskTable({ tasks, setOpen }: TaskTableProps) {
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
              <TableHead className="font-bold text-gray-800">
                Task Title
              </TableHead>
              <TableHead className="font-bold text-gray-800">
                Description
              </TableHead>
              <TableHead className="font-bold text-gray-800">
                Due Date
              </TableHead>
              <TableHead className="text-right font-bold text-gray-800">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
  {tasks.map((task, index) => (
    <TableRow key={index}>
      <TableCell className="font-bold text-gray-800">
        {task.title}
      </TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.dueDate}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          size="sm"
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