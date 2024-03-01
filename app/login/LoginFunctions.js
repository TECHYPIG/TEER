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

    const handleClick = () => {
        console.log("click");
    };

    return(
        <button  className="Submit" onClick={handleClick}>Submit</button>
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
