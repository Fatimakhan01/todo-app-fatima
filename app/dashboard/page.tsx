import DashboardHeader from "@/components/dashboard/dashboard-header";
import TaskTable from "@/components/dashboard/task-table";

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <TaskTable/>
      
    </div>
  );
}