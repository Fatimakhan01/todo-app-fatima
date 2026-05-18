import { prisma } from "@/lib/prisma";
import AIChatClient from "@/components/ai/AIChatClient";

export default async function AIPage() {
  const userId = "temporary-user";

  const conversation =
    await prisma.conversation.findFirst({
      where: {
        userId,
      },

      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

  const initialMessages =
    conversation?.messages.map((message) => ({
      id: message.id,
      role: message.role,
      parts: [
        {
          type: "text",
          text: message.content,
        },
      ],
    })) || [];

  return (
    <AIChatClient
      initialMessages={initialMessages}
    />
  );
}