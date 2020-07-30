import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === "GET") {
    if (req.query.fieldSite == "true") {
      const locations = await prisma.location.findMany({
        orderBy: {
          name: "asc",
        },
        where: {
          AND: [
            { fieldSite: true },
            {
              name: {
                startsWith:
                  req.query.searchTerm.charAt(0).toUpperCase() +
                  req.query.searchTerm.slice(1),
              },
            },
          ],
        },
      });
      res.json({ locations });
    } else {
      const locations = await prisma.location.findMany({
        orderBy: {
          name: "asc",
        },
        where: {
          fieldSite: false,
        },
      });
      res.json({ locations });
    }
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
