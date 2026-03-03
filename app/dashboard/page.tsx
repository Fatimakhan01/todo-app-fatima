"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TaskTable from "@/components/dashboard/task-table";
import AddTaskDialog from "@/components/dashboard/add-task-dialog";
import EditTaskDialog from "@/components/dashboard/edit-task-dialog";

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), ...task },
    ]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div>
      <DashboardHeader />
      <TaskTable
        tasks={tasks}
        setOpen={setOpen}
        setEditOpen={setEditOpen}
        setSelectedTask={setSelectedTask}
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
    </div>
  );
}