import prisma from "./prismaClient";
import jwt from 'jsonwebtoken';
 
export default async function handler(req, res) {
    const { method, body, headers, query } = req;
 
    switch (method) {
        case 'POST':
            try {
                // Extract the JWT token from the authorization header
                const token = headers.authorization.split(' ')[1];
 
                // Verify the JWT token
                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                if (!decodedToken) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
 
                // Extract the username from the decoded token
                const { username } = decodedToken;
 
                // Extract the followed username from the query parameters
                const { followedUsername } = query;
 
                // Fetch the logged-in user details
                const user = await prisma.users.findUnique({
                    where: { Username: username },
                });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
 
                // Add the followed username to the Following array of the logged-in user
                const updatedUser = await prisma.users.update({
                    where: { Username: username },
                    data: {
                        Following: {
                            // Use Prisma's set operation to add the followed username to the Following array
                            set: [...user.Following, followedUsername]
                        }
                    }
                });
 
                // Return the updated user details
                res.status(200).json(updatedUser);
            } catch (error) {
                console.error('Error following user:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        case 'GET':
            try {
                // Extract JWT token from headers
                const token = headers.authorization.split(' ')[1];
                // Verify JWT token
                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                if (!decodedToken) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                // Extract username from decoded token
                const { username } = decodedToken;
                // Fetch user details for the logged in user
                const loggedInUser = await prisma.users.findUnique({
                    where: { Username: username },
                    include: {
                        Following: true
                    }
                });
                if (!loggedInUser) {
                    return res.status(404).json({ error: 'Logged in user not found' });
                }
                // Fetch users in the Following array of the logged in user
                const followedUsers = await prisma.users.findMany({
                    where: {
                        Username: {
                            in: loggedInUser.Following
                        }
                    }
                });
                res.status(200).json(followedUsers);
            } catch (error) {
                console.error('Error fetching followed users:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        default:
            res.setHeader('Allow', ['POST', 'GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
