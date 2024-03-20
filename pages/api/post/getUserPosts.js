import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function getUserPosts(req, res) {
  const { method, headers } = req;

  switch (method) {
    case "GET":
      try {
        const username = await getUsername(headers, res);
        const posts = await getPosts(username);
        res.status(201).json(posts);
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
          content: "Could not get post",
          error: "Internal Server Error",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

//using token to get username
async function getUsername(headers, res) {
  let username = null;
  try {
    const token = headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    username = decodedToken.username;
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return username;
}

// send post to database
async function getPosts(user) {
  const posts = await prisma.post.findMany({
    where: {
      Username: user,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}
