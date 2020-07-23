import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === "GET") {
    const locations = await prisma.location.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.json({ locations });
  }

  if (req.method === "POST") {
    const { body } = req;

    const location = await prisma.location.create({
      data: {
        name: body.name,
      },
    });

    res.json(location);
  }
}
