import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function deletePost(req, res) {
  const { method, body, headers } = req;

  switch (method) {
    case "DELETE":
      try {
        const { postId } = body;
        const username = await getUsername(headers, res);

        if (!username) {
          return;
        }

        const deletedPost = await deletePostDB(postId, username);

        if (!deletedPost) {
          return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
      } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
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

// Delete Post from database
async function deletePostDB(postId, userId) {
  const deletedPost = await prisma.post.deleteMany({
    where: {
      id: postId,
      Username: userId,
    },
  });

  return deletedPost.count > 0;
}