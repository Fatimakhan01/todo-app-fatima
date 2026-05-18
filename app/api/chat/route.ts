import {
  streamText,
  convertToModelMessages,
} from "ai";

import { model } from "@/lib/ai/gemini";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const userId = "temporary-user";

    const { messages } = await req.json();

    const latestMessage =
      messages[messages.length - 1];

    let conversation =
      await prisma.conversation.findFirst({
        where: {
          userId,
        },
      });

    if (!conversation) {
      conversation =
        await prisma.conversation.create({
          data: {
            userId,
          },
        });
    }

    if (latestMessage?.parts?.[0]?.text) {
      await prisma.message.create({
        data: {
          role: "user",
          content: latestMessage.parts[0].text,
          conversationId: conversation.id,
        },
      });
    }

    const tasks = await prisma.task.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const taskContext =
      tasks.length > 0
        ? tasks
            .map(
              (t, i) =>
                `${i + 1}. ${t.title} - ${t.status} - ${t.priority}`
            )
            .join("\n")
        : "No tasks found";

    const modelMessages =
      await convertToModelMessages(messages);

    const result = streamText({
      model,
      messages: modelMessages,

      system: `
You are a productivity AI assistant inside a SaaS todo application.

Use the user's tasks to help with:
- prioritization
- productivity
- planning
- task summaries

User Tasks:
${taskContext}
      `,

      async onFinish(event) {
        const assistantText = event.text;

        if (assistantText) {
          await prisma.message.create({
            data: {
              role: "assistant",
              content: assistantText,
              conversationId:
                conversation.id,
            },
          });
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}