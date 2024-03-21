import prisma from "./prismaClient"
import 'dotenv/config'
import jwt from 'jsonwebtoken'

//api that takes a username and gets all the users with the same username from the database
//author: Ines Rita
export default async function handler(req, res) {
    const { method, query, headers } = req;

    switch (method) {
        // Search for users by username
        case 'GET':
            try {
                const { username } = query;
                
                if (!username) {
                    return res.status(400).json({ error: 'Username is required' });
                }

                // Extract username from JWT token
                const token = headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                if (!decodedToken) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                const loggedInUsername = decodedToken.username;

                // Fetch logged-in user to get the Block array
                const loggedInUser = await prisma.users.findUnique({
                    where: { Username: loggedInUsername },
                    select: { Block: true }
                });
                if (!loggedInUser) {
                    return res.status(404).json({ error: 'Logged in user not found' });
                }

                // Fetch users excluding those in the Block array of the logged-in user
                const users = await prisma.users.findMany({
                    where: {
                        Username: {
                            startsWith: username,
                            mode: 'insensitive'
                        },
                        NOT: {
                            Username: {
                                in: loggedInUser.Block
                            }
                        }
                    }
                });

                return res.status(200).json(users);
            } catch (error) {
                console.error('Error fetching users:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        default:
            return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
}
