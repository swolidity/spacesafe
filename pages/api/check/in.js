import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const checkIns = await prisma.activityLog.findMany({
      where: {
        AND: [
          { user: { email: session.user.email } },
          {
            checkOut: null,
          },
        ],
      },
      include: {
        location: true,
      },
    });

    res.json({ checkIns });
  }

  if (session) {
    const { body } = req;

    const checkin = await prisma.activityLog.create({
      data: {
        user: {
          connect: {
            email: session.user.email,
          },
        },
        location: {
          connect: {
            id: body.location,
          },
        },
        roomNumber: parseInt(body.roomNumber),
      },
      include: {
        location: true,
      },
    });

    res.json(checkin);
  }
}
