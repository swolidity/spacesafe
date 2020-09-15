import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "GET" && session) {
    const user = await prisma.user.findOne({
      where: {
        email: session.user.email,
      },
    });

    if (!user.isAdmin) res.status(403).send("Forbidden");

    const logs = await prisma.activityLog.findMany({
      include: {
        location: true,
        user: true,
      },
    });

    res.json({ logs });
  } else {
    res.status(401).send("Unauthorized");
  }
}
