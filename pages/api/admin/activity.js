import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "GET" && session) {
    const logs = await prisma.activityLog.findMany({
      include: {
        location: true,
        user: true,
      },
    });

    res.json({ logs });
  }
}