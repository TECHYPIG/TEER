'use client'
import "./LoginFunctions.css"
import React, { useState} from "react"
import Cookies from 'js-cookie';
import Link from "next/link";
import {useRouter} from "next/navigation";

//Both the username and password in the login page
export function TextBoxes(){
    const router = useRouter()
    const [userName,ChangedUsername] = useState("")
    const [passWord,ChangedPassword] = useState("")
    const [incorrectLogin,changedIncorrectLogin] = useState("")
    return(
        <div className= "Form">
            <label className="TextAboveBox">Username</label>
            <input type="Text" className="TextInputUsername" value={userName}
                onChange ={(e) => ChangedUsername(e.target.value)}/>

            <label className="TextAboveBox">Password</label>
            <input type="Text" className="TextInputPassword" value={passWord}
                   onChange={(e) => ChangedPassword(e.target.value)}/>
            <h5>{incorrectLogin}</h5>

            <input  type="Submit" className="Submit" onClick={async function inside (){
                //This function calls the api and checks if the username and password are good
                changedIncorrectLogin("")
                var returingValue =   await callAPI(userName, passWord)
                //returning value checks either to send them to homepage or display if the values are incorrect.
                if(returingValue === 1){
                    router.push("/home");
                } else{
                    changedIncorrectLogin("Your username or password was incorrect")
                }

            }}/>

        </div>
    );
}

export function SignIn(){
    return(
        <h1 className="SignIn">Sign In</h1>
    );
}

/* REGISTER FUNCTIONS */
export function RegisterText(){
    return (
            <h1 className="RegisterHere">Register Here</h1>
    )
}
export function RegisterTextBelow(){
    return (
        <h1 className="RegisterText">Welcome to the world of adventure and stories,
        Join us now to find new volunteers and make stories of a life time</h1>
    )
}
export function RegisterButton(){
    return (
        <Link href={"/register"}>
        <button className="RegisterButton">No account yet? Sign-Up</button>
        </Link>
    )
}

/* FUNCTIONS FOR SUBMITTING */
async function callAPI(name, password) {
    var response;
    if (name === null){
        return 0;
    }
    if (password === null){
        return 0;
    }
    try {
        response = await fetch('/api/login', {
            method: 'POST', // Adjust the method as needed (GET, POST, etc.)
            'Content-Type': 'application/json',
            body: JSON.stringify({
                name: name,
                password: password
            })
        })
        //this gets the JWT from the api.
        let jsonResponse = await response.json()
        if (jsonResponse.accessToken !== 1) {
            return 0;
        } else {
            //This sets the jwt token in the cookies so it can accessed by others.
            const fullToken = response.headers.get("Authorization")
            const tokenSplit = fullToken.split(" ")[1]
            Cookies.set("accessToken", tokenSplit)
            return 1;
        }
    }
    catch (error){
        console.log(error);
    }
}
