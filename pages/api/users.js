import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === "GET") {
    return await prisma.user.findMany();
  }

  if (req.method === "POST") {
    const { body } = req;

    let user;
    try {
      user = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          image: body.image,
        },
      });
    } catch (e) {
      // user already exists so just return true to log them in
      user = true;
    }

    res.json(user);
  }
}
