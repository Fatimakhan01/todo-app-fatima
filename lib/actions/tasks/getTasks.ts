"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getTasks({
  search,
  status,
  priority,
  sort,
}: {
  search?: string;
  status?: string;
  priority?: string;
  sort?: string;
}) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const trimmedSearch = search?.trim();

  let orderBy: any = { createdAt: "desc" };

  if (sort === "oldest") {
    orderBy = { createdAt: "asc" };
  }

  if (sort === "dueDate") {
    orderBy = { dueDate: "asc" };
  }

  if (sort === "priority") {
    orderBy = { priority: "desc" };
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,

      ...(trimmedSearch && {
        OR: [
          {
            title: {
              contains: trimmedSearch,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: trimmedSearch,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(status && {
        status,
      }),

      ...(priority && {
        priority,
      }),
    },

    orderBy,

    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
      status: true,
      priority: true,
    },
  });

  return tasks;
}