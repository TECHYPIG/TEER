import prisma from "./prismaClient";

//api that gets number of usernames a user follows
//author: Ines Rita
export default async function handler(req, res) {
    const { method, query } = req;

    switch (method) {
        case 'GET':
            try {
                const { username } = query;

                if (!username) {
                    return res.status(400).json({ error: 'Username parameter is required' });
                }

                // Fetch user details based on the provided username
                const user = await prisma.users.findUnique({
                    where: { Username: username },
                    select: { Following: true }
                });

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                // Return the number of usernames in the Following array of the user
                res.status(200).json({ followingCount: user.Following.length });
            } catch (error) {
                console.error('Error fetching following count:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
