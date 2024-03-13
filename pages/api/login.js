import {PrismaClient} from '@prisma/client'
var jwt = require('jsonwebtoken');
import 'dotenv/config'
const prisma = new PrismaClient()


export default async function handler(req, res) {
    const name = JSON.parse(req.body).name; //Opening a json object

    let password = await prisma.users.findUnique({
        where: {
            Username: name,
        },
        select: {
            Password: true
        }
    });
    if (password != null) {
        //Accessing the output from the database
        //Add in the functionality to compare passwords, Else respond with incorrect password
        let token = jwt.sign({username: name}, process.env.ACCESS_TOKEN)
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({"accessToken" : 1})
    } else {
        console.log("There is an issue");
        return res.status(500).json({"accessToken" : 0});
    }
}
