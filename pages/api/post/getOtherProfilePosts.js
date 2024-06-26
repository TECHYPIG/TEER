import prisma from "../prismaClient";
import "dotenv/config";

//api with username given through query parameter that gets posts to populate a profile page
//author: Ines Rita
export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    // Get posts by username
    case "GET":
      try {
        const { username } = query;

        if (!username) {
          return res.status(400).json({ error: "Username is required" });
        }

        // Find the user by username
        const posts = await prisma.post.findMany({
          where: {
            Username: username,
          },
          include: {
            user: true, // Include user data in the returned posts
            Comments: { include: { user: true } }, // Include comments data in the returned posts
            likes: true, // Include likes data in the returned posts
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (!posts) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
