import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function fetchPostsByFollowedUsers(req, res) {
  const { method, headers } = req;

  switch (method) {
    case "GET":
      try {
        const username = await getUsername(headers, res);
        const userInfo = await getUser(username, res);
        const followedUsernames = userInfo.Following.concat(username);
        const posts = await GetPosts(followedUsernames);
        res.status(200).json(posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({
          content: "Count not fetch user posts",
          error: "Internal Server Error",
        });
      }
  }
}

//using token to get username
async function getUsername(headers, res) {
  let username = null;
  try {
    //Get logged in user token and decode it
    const token = headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    username = decodedToken.username;
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(500)
      .json({ content: "User doesnt exist", error: "Internal Server Error" });
  }

  return username;
}

//using username to get user info including following
async function getUser(username, res) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        Username: username,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      content: "User infomation could not be found",
      error: "Internal Server Error",
    });
    return null;
  }
}

//using user following to get posts
async function GetPosts(followedUsernames) {
  const posts = await prisma.post.findMany({
    where: {
      user: {
        Username: {
          in: followedUsernames,
        },
      },
    },
    include: {
      user: true, // Include user data in the returned posts
      Comments: { include: { user: true } }, // Include comments data in the returned posts
      likes: true, // Include likes data in the returned posts
    },
    orderBy: {
      createdAt: "desc", // Order by createdAt in descending order
    },
  });

  return posts;
}
