"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SortSelectProps = {
  defaultValue?: string;
};

export default function SortSelect({ defaultValue }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => handleChange(e.target.value)}
      className="border rounded-md p-1"
    >
      <option value="">Sort by Latest</option>
      <option value="oldest">Oldest</option>
      <option value="dueDate">Due Date</option>
      <option value="priority">Priority</option>
    </select>
  );
}