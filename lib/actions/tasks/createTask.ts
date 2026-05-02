"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createTask(data: {
  title: string;
  description: string;
  dueDate: string;
  priority?: string;
}) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const isPro = user?.subscriptionPlan === "pro";

  const tasksCount = await prisma.task.count({
    where: { userId },
  });

  if (!isPro && tasksCount >= 5) {
    throw new Error("Free users can only create up to 5 tasks. Upgrade to Pro.");
  }

  await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      priority: data.priority || "medium",
      status: "pending",
      userId,
    },
  });

  revalidatePath("/dashboard");
}