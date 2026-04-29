import DashboardHeader from "@/components/dashboard/dashboard-header";
import TaskTable from "@/components/dashboard/task-table";
import AddTaskDialog from "@/components/dashboard/add-task-dialog";
import SubscribeSection from "@/components/dashboard/subscribe-section";

import SearchInput from "@/components/tasks/search-input";
import { getTasks } from "@/lib/actions/tasks/getTasks";

export default async function DashboardPage({ searchParams }: any) {
  const params = await searchParams;

  const search = params?.search || "";

  const tasks = await getTasks(search);

  return (
    <div>
      <DashboardHeader />
      <div className="px-4 mt-4">
        <SearchInput defaultValue={search} />
      </div>

      <div className="px-4 mt-4 flex justify-end">
        <AddTaskDialog />
      </div>

      <TaskTable tasks={tasks} />

      <SubscribeSection />
    </div>
  );
}