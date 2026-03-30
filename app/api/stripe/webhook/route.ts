import { stripe } from "@/lib/stripe-server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(`Webhook Error`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
  const session = event.data.object as any;

  if (!session.customer) {
    console.log("No customer ID in session:", session);
    return new Response("No customer in session", { status: 200 }); 
  }

  await prisma.user.update({
    where: { stripeCustomerId: session.customer },
    data: { subscriptionPlan: "pro" },
  });

  break;
}

    case "customer.subscription.deleted": {
      const sub = event.data.object as any;

      if (!sub.customer) {
        console.error("No customer ID in subscription:", sub);
        return new Response("No customer ID", { status: 400 });
      }

      try {
        await prisma.user.update({
          where: { stripeCustomerId: sub.customer },
          data: { subscriptionPlan: "free" },
        });
      } catch (err) {
        console.error("Prisma update error:", err);
        return new Response("Prisma update failed", { status: 500 });
      }

      break;
    }
  }

  return new Response("Webhook received", { status: 200 });
}