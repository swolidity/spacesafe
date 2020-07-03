import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const checkOuts = await prisma.activityLog.findMany({
      where: {
        NOT: {
          checkOut: null,
        },
      },
    });

    res.json({ checkOuts });
  }

  if (req.method === "POST" && session) {
    const { body } = req;

    if (!body.checkInID) throw new Error("No checkInID");

    const checkOut = await prisma.activityLog.update({
      data: {
        checkOut: new Date(),
      },
    });

    res.json(checkOut);
  } else {
    throw new Error("Not Authorized.");
  }
}
