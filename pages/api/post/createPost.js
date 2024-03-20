import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function createPost(req, res) {
  const { method, body, headers } = req;

  switch (method) {
    case "POST":
      try {
        const { title, content } = body;
        const username = await getUsername(headers, res);
        // const userId = await getUserId(username);
        const post = await sendPostDB(username, content, title);
        res.status(201).json(post);
      } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
          content: "Could not create post",
          error: "Internal Server Error",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

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

async function getUserId(username) {
  const user = await prisma.users.findUnique({
    where: {
      Username: username,
    },
  });
  return user.id;
}


// send post to database
async function sendPostDB(username, content, title) {
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: true,
      picture_url: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
      user: {
        connect: {
          Username: username,
        },
      },
    },
  });
  return post;
}
