import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "GET" && session) {
    const user = await prisma.user.findOne({
      where: {
        email: session.user.email,
      },
    });

    if (!user.isAdmin) {
      res.status(403).send("Forbidden");
    }

    const users = await prisma.user.findMany();
    res.json({ users });
  } else {
    res.status(401).send("Unauthorized");
  }
}
