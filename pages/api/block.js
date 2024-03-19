// Import necessary modules and dependencies
import prisma from "./prismaClient";
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
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}