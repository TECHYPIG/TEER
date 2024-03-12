'use client'
import "./LoginFunctions.css"
import React, { useState} from "react"
import Image from "next/image"
import profilePic from './/images/google.png'
import Cookies from 'js-cookie';

export function TextBoxes(){
    const [userName,ChangedUsername] = useState("")
    const [passWord,ChangedPassword] = useState("")
    return(
        <div className= "Form">
            <label className="TextAboveBox">Username</label>
            <input type="Text" className="TextInputUsername" value={userName}
                onChange ={(e) => ChangedUsername(e.target.value)}/>

            <label className="TextAboveBox">Password</label>
            <input type="Text" className="TextInputPassword" value={passWord}
                   onChange={(e) => ChangedPassword(e.target.value)}/>

            <input  type="Submit" onClick={() =>  callAPI(userName)}
                    className="Submit" />
        </div>
    );
}

export function SignIn(){
    return(
        <h1 className="SignIn">SignIn</h1>
    );
}
export function Google(){
    return(
        <Image
        src ={profilePic}
        width={150}
        height={150}
         alt="Hello"
        className="Google"/>
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
        <button className="RegisterButton" onClick={checkAuthorization}>No account yet? SignUp</button>
    )
}

/* FUNCTIONS FOR SUBMITTING */
async function callAPI(name) {
    var response;
    console.log(name)
    try{
     response =  await fetch('/api/login', {
        method: 'POST', // Adjust the method as needed (GET, POST, etc.)
        'Content-Type': 'application/json',
        body: JSON.stringify({name})
    })
        const fullToken = response.headers.get("Authorization")
        const tokenSplit = fullToken.split(" ")[1]
        Cookies.set("accessToken", tokenSplit)
        console.log(tokenSplit)
    }
    catch (error){
        console.log(error);
    }
}
async function checkAuthorization(){
    try{
       let response =  await fetch('/api/authorize', {
           method: 'GET', // Adjust the method as needed (GET, POST, etc.)
           'Content-Type': 'application/json'
       })
        console.log(await response.json())
    } catch (error){
        console.log(error)
    }
}