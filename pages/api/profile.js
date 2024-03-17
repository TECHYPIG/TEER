import prisma from "./prismaClient"
import 'dotenv/config'
import jwt from 'jsonwebtoken'


export default async function handler(req, res) {
    const { method, body, headers } = req;

    switch (method) {
        //get logged in user and all user details
        case 'GET':
            try {


                const token = headers.authorization.split(' ')[1];

                
                
                // Verify JWT token
                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                if (!decodedToken) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                // Extract username from decoded token
                const { username } = decodedToken;

                // Fetch user details for the authenticated user
                const user = await prisma.users.findUnique({
                    where: { Username:username },
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
            //add or update logged in user details
            case 'POST':
                try {

                    

                    const token = headers.authorization.split(' ')[1];

                    // Verify JWT token
                    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                    if (!decodedToken) {
                        return res.status(401).json({ error: 'Unauthorized' });
                    }
    
                    // Extract username from decoded token
                    const { username } = decodedToken;


                    console.log('Received body:', body);

                    // Parse the body string to JSON
                   // const requestBody = JSON.parse(body);

                    delete body.id;
                    delete body.Password;
                    

                    console.log('Received body2:', body);

    
                    // Update user details based on the provided data
                    //const { Firstname, Surname, Username, Email, Role, Location, Gender, Birthday, Bio } = JSON.parse(body);
                    const updatedUser = await prisma.users.update({
                        where: { Username: username },
                        data: body, 
                    });
    
                    res.status(200).json(updatedUser);
                } catch (error) {
                    console.error('Error updating user details:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT']);
                res.status(405).end(`Method ${method} Not Allowed`);
    }
}
