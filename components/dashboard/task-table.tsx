"use client";

import { Button } from "@/components/ui/button";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table";

export default function TaskTable() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-white shadow-sm rounded-lg border ">
        <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-end">
         <Button className="bg-blue-600 hover:bg-blue-700">
           Add Task
         </Button>
        </div>
        <Table>
          <TableHeader >
            <TableRow>
              <TableHead className="font-bold text-gray-800">Task Title</TableHead>
              <TableHead className="font-bold text-gray-800">Description</TableHead>
              <TableHead className="font-bold text-gray-800">Due Date</TableHead>
              <TableHead className="text-right font-bold text-gray-800">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className="font-bold text-gray-800">
                Task Filtering
              </TableCell>
              <TableCell>
                Add filter option to sort tasks by status and date.             
            </TableCell>
              <TableCell>25-March-2026</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  size="sm" >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-bold text-gray-800">
                Design Login Page
              </TableCell>
              <TableCell>
                Create responsive login form UI
              </TableCell>
              <TableCell>01-April-2026</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  size="sm">
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}