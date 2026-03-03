"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TaskTable from "@/components/dashboard/task-table";
import AddTaskDialog from "@/components/dashboard/add-task-dialog";
import EditTaskDialog from "@/components/dashboard/edit-task-dialog";
import DeleteTaskDialog from "@/components/dashboard/delete-task-dialog";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Add Task
  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), ...task },
    ]);
  };

  // Update Task
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <DashboardHeader />

      <TaskTable
        tasks={tasks}
        setOpen={setOpen}
        setEditOpen={setEditOpen}
        setSelectedTask={setSelectedTask}
        setDeleteOpen={setDeleteOpen}
      />

      <AddTaskDialog
        open={open}
        setOpen={setOpen}
        addTask={addTask}
      />

      <EditTaskDialog
        open={editOpen}
        setOpen={setEditOpen}
        selectedTask={selectedTask}
        updateTask={updateTask}
      />

      <DeleteTaskDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        selectedTask={selectedTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}