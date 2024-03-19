// Import necessary modules and dependencies
import prisma from "./prismaClient";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
 
// Define the API handler function
export default async function handler(req, res) {
    const { method, query, headers } = req;
 
    switch (method) {
        // Handle POST requests
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
 
                // Extract the blocked username from the query parameters
                const { blockedUsername } = query;
 
                // Fetch the logged-in user details
                const user = await prisma.users.findUnique({
                    where: { Username: username },
                });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
 
                // Add the blocked username to the Block array of the logged-in user
                const updatedUser = await prisma.users.update({
                    where: { Username: username },
                    data: {
                        Block: {
                            // Use Prisma's set operation to add the blocked username to the Block array
                            set: [...user.Block, blockedUsername]
                        }
                    }
                });
 
                // Return the updated user details
                res.status(200).json(updatedUser);
            } catch (error) {
                console.error('Error blocking user:', error);
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
                    // Fetch user details for the logged-in user
                    const loggedInUser = await prisma.users.findUnique({
                        where: { Username: username },
                        select: { Block: true }
                    });
                    if (!loggedInUser) {
                        return res.status(404).json({ error: 'Logged in user not found' });
                    }
                    // Return the usernames in the Block array of the logged-in user
                    res.status(200).json(loggedInUser.Block);
                } catch (error) {
                    console.error('Error fetching blocked users:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
                break;
            case 'DELETE':
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
 
                // Extract the username to unblock from the query parameters
                const { unblockedUsername } = req.query;
 
                // Fetch the logged-in user details
                const user = await prisma.users.findUnique({
                    where: { Username: username },
                });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
 
                // Remove the unblocked username from the Block array of the logged-in user
                const updatedUser = await prisma.users.update({
                    where: { Username: username },
                    data: {
                        Block: {
                            // Use Prisma's filtering operation to remove the unblocked username from the Block array
                            set: user.Block.filter(blockedUser => blockedUser !== unblockedUsername)
                        }
                    }
                });

                res.status(200).json({ message: 'User unblocked successfully' });
            } catch (error) {
                console.error('Error unblocking user:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

            
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}