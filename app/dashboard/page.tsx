"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import TaskTable from "@/components/dashboard/task-table";
import AddTaskDialog from "@/components/dashboard/add-task-dialog";

export interface Task {
  title: string;
  description: string;
  dueDate: string;
}

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div>
      <DashboardHeader />
      <TaskTable tasks={tasks} setOpen={setOpen} />
      <AddTaskDialog
        open={open}
        setOpen={setOpen}
        addTask={addTask}
      />
    </div>
  );
}