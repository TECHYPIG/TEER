import prisma from './prismaClient';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
            try{
                const tokenNotSplit = req.headers["cookie"]
                const token = tokenNotSplit.split("=")[1]
        const Username  = jwt.verify(token,process.env.ACCESS_TOKEN);
        const user = await prisma.users.findUnique({ where: { Username: Username.username } });
        // Extract the Followers array from the user object
        const followers = user.Following

        // Fetch all users from the database
        const allUsers = await prisma.users.findMany();

        // Filter out the users that are already in the Followers array
        const suggestedFollowers = allUsers.filter(u => !followers.includes(u.Username));
        const usernamesOfNonFollowers = []
        for (let i = 0; i < suggestedFollowers.length; i++){
            usernamesOfNonFollowers.push(
            suggestedFollowers[i].Username
            )
        }
        console.log('Suggested followers:', usernamesOfNonFollowers)
        // Return the suggested followers in the response
        res.status(200).json(usernamesOfNonFollowers);

    } catch (error) {
        console.error('Error fetching suggested followers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}