import prisma from './prismaClient';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method, body, headers, query } = req;

    switch (method) {
        case 'GET':
            try{
        const { username } = jwt.verify(headers.authorization.split(' ')[1], process.env.ACCESS_TOKEN);
        const user = await prisma.users.findUnique({ where: { Username: username } });
        // Extract the Followers array from the user object
        const followers = user.Followers;
        console.log('Followers:', followers);

        // Fetch all users from the database
        const allUsers = await prisma.users.findMany();

        // Filter out the users that are already in the Followers array
        const suggestedFollowers = allUsers.filter(u => !followers.includes(u.Username));
        console.log('Suggested followers:', suggestedFollowers);
        // Return the suggested followers in the response
        res.status(200).json(suggestedFollowers);

    } catch (error) {
        console.error('Error fetching suggested followers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
            }
    }