"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditTaskDialog from "@/components/dashboard/edit-task-dialog";
import DeleteTaskDialog from "@/components/dashboard/delete-task-dialog";

interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | Date | null;
}

interface TaskTableProps {
  tasks: Task[];
}

export default function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white shadow-sm rounded-lg border">

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
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No tasks available
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No due date"}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <EditTaskDialog task={task} />
                    <DeleteTaskDialog taskId={task.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}