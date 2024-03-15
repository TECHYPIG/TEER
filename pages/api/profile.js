import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            try {
                // Extract JWT token from request headers
                const token = headers.authorization?.replace('Bearer ', '');
                if (!token) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                
                // Verify JWT token
                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                if (!decodedToken) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                // Extract username from decoded token
                const { username } = decodedToken;

                // Fetch user details for the authenticated user
                const user = await prisma.users.findUnique({
                    where: { username },
                });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.status(200).json(user);
            } catch (error) {
                console.error('Error fetching user details:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
            case 'POST':
                try {
                    // Extract JWT token from request headers
                    const token = headers.authorization?.replace('Bearer ', '');
                    if (!token) {
                        return res.status(401).json({ error: 'Unauthorized' });
                    }
                    
                    // Verify JWT token
                    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                    if (!decodedToken) {
                        return res.status(401).json({ error: 'Unauthorized' });
                    }
    
                    // Extract username from decoded token
                    const { username } = decodedToken;
    
                    // Update user details based on the provided data
                    const { firstname, surname, newUsername, email, role, location, gender, birthday, bio } = JSON.parse(body);
                    const updatedUser = await prisma.users.update({
                        where: { username },
                        data: { firstname, surname, username: newUsername, email, role, location, gender, birthday, bio },
                    });
    
                    res.status(200).json(updatedUser);
                } catch (error) {
                    console.error('Error updating user details:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
