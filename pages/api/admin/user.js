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

    res.json({ user });
  } else {
    res.status(401).send("Unauthorized");
  }
}
