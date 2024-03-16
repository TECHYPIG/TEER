import {PrismaClient} from '@prisma/client'
var jwt = require('jsonwebtoken');
import 'dotenv/config'
const prisma = new PrismaClient()
import crypto from "crypto";


export default async function handler(req, res) {
    const name = JSON.parse(req.body).name; //Opening a json object
    let inputtedPassword = JSON.parse(req.body).password; //Opening a json object

    inputtedPassword = crypto.createHash("sha256").update(inputtedPassword).digest('hex')

    let password = await prisma.users.findUnique({
        where: {
            Username: name,
        },
        select: {
            Password: true
        }
    });
    if (password != null) {
        console.log(password.Password)
        console.log(inputtedPassword)
        password = password.Password
        if(password == inputtedPassword){
            console.log(inputtedPassword)
            let token = jwt.sign({username: name}, process.env.ACCESS_TOKEN)
            res.setHeader('Authorization', `Bearer ${token}`);
            res.status(200).json({"accessToken" : 1})
        }
        else{
            console.log("Password isnt correct");
            return res.status(500).json({"accessToken" : 0});
        }
        //Accessing the output from the database
        //Add in the functionality to compare passwords, Else respond with incorrect password
    } else {
        console.log(password)
        console.log("User not found");
        return res.status(500).json({"accessToken" : 0});
    }
}
