import DashboardHeader from "@/components/dashboard/dashboard-header";
import TaskTable from "@/components/dashboard/task-table";
import AddTaskDialog from "@/components/dashboard/add-task-dialog";
import SubscribeSection from "@/components/dashboard/subscribe-section";

import SearchInput from "@/components/tasks/search-input";
import Filters from "@/components/tasks/filters";
import SortSelect from "@/components/tasks/sort-select";
import { getTasks } from "@/lib/actions/tasks/getTasks";

export default async function DashboardPage({ searchParams }: any) {
  const params = await searchParams;

  const search = params?.search || "";
  const status = params?.status || "";
  const priority = params?.priority || "";
  const sort = params?.sort || "";

  const tasks = await getTasks({
    search,
    status,
    priority,
    sort,
  });

  return (
    <div>
      <DashboardHeader />

     <div className="px-4 mt-4 flex items-center justify-between flex-wrap gap-4">
  
     <div className="w-full sm:w-auto flex-1 max-w-md">
      <SearchInput defaultValue={search} />
     </div>

     <div className="flex gap-2 ">
      <Filters />
      <SortSelect defaultValue={sort} />
     </div>

     </div>
      <div className="px-4 mt-4 flex justify-end">
        <AddTaskDialog />
      </div>

      <TaskTable tasks={tasks} />

      <SubscribeSection />
    </div>
  );
}