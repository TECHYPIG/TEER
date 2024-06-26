import prisma from "./prismaClient"
import 'dotenv/config'
import {patchConsoleError} from "next/dist/client/components/react-dev-overlay/internal/helpers/hydration-error-info";
import {response} from "express";


export default async function handler(req, res) {

            const username = JSON.parse(req.body).username; //Opening a json object
            const email = JSON.parse(req.body).email; //Opening a json object
            const location = JSON.parse(req.body).location; //Opening a json object
            const description = JSON.parse(req.body).description; //Opening a json object
            const company = JSON.parse(req.body).company; //Opening a json object
            const role = JSON.parse(req.body).role; //Opening a json object
            console.log(username.Username)
            console.log(email)
            console.log(location)
            console.log(description);
            console.log(company);
            console.log(role);


            try {
                const returning = await prisma.volunteer.create({
                    data: {
                        username: username.Username,
                        email: email,
                        location: location,
                        description: description,
                        company: company,
                        role: role
                    }
                })
                return res.status(200).json(1)
            } catch (error) {
                return res.status(500).json(0)

            }
}