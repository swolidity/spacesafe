import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  if (req.method === "POST") {
    const { body } = req;

    let user;
    try {
      user = await prisma.user.upsert({
        create: {
          name: body.name,
          email: body.email,
          image: body.image,
        },
        update: {},
        where: {
          email: body.email,
        },
      });
    } catch (e) {
      // user already exists so just return true to log them in
      console.log(e.message);
      user = true;
    }

    return res.json(user);
  }
}
