import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "GET" && session && req.query.id) {
    const checkIns = await prisma.activityLog.findMany({
      where: {
        AND: [
          { user: { email: session.user.email } },
          {
            id: req.query.id,
          },
        ],
      },
      include: {
        location: true,
      },
    });

    const checkIn = checkIns[0];

    return res.json({ checkIn });
  }

  if (req.method === "POST" && session && req.body.id) {
    const edit = await prisma.activityLog.updateMany({
      where: {
        id: req.body.id,
      },
      data: {
        editedCheckIn: req.body.checkIn
          ? new Date(req.body.checkIn)
          : undefined,
        editedCheckOut: req.body.checkOut
          ? new Date(req.body.checkOut)
          : undefined,
      },
    });

    return res.json(edit);
  }
}
