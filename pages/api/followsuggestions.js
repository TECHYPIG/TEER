import prisma from "./prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    const tokenNotSplit = req.headers["cookie"];
    const token = tokenNotSplit.split("=")[1];
    const Username = jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await prisma.users.findUnique({
      where: { Username: Username.username },
    });
    // Extract the Followers array from the user object
    const followers = user.Following;

    // Fetch all users from the database
    const suggestedFollowers = await prisma.users.findMany({
        where: {
          Username: {
            not: user.username, // Exclude the current user
          },
        },
        take: 10, // Limit the number of users returned
        orderBy: {
          id: 'asc', // Order by id to get a consistent result
        },
      });
    const usernamesOfNonFollowers = [];
    for (let i = 0; i < suggestedFollowers.length; i++) {
      usernamesOfNonFollowers.push(suggestedFollowers[i]);
    }
    // Return the suggested followers in the response
    res.status(200).json(usernamesOfNonFollowers);
  } catch (error) {
    console.error("Error fetching suggested followers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
