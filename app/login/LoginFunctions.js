'use client'
import "./LoginFunctions.css"
import React from "react"
import Image from "next/image"
import profilePic from './/images/google.png'

export function TextBoxes(textProp){
    return(
        <div className="TextAndBoxes">
            <h2 className="TextAboveBox">{textProp.values}</h2>
            <input type="Text"
                className="TextInput"/>
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
export function Submit(){
    return(
        <button  className="Submit" onClick={() => callAPI("jugtejSingh")}>Submit</button>
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
        <button className="RegisterButton">No account yet? SignUp</button>
    )
}

/* FUNCTIONS FOR SUBMITTING */
async function callAPI(name) {
    try{
    let response =  await fetch('/api/route', {
        method: 'POST', // Adjust the method as needed (GET, POST, etc.)
        'Content-Type': 'application/json',
        body: JSON.parse({name})
    });}
    catch (error){
        console.log(error);
    }
}