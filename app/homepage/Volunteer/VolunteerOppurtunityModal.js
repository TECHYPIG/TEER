import "./VolunteerOppurtunityModal.css"
import {deletingVolunteering} from "./serverVolunteer"
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
export default function ModalOpportunity({open, close,username,location,email,description,company,role, usernameOfLoggedInUser, id}){

    if (open === false) {
        return null
    }

    return (
        <div className="Background">
            <div className="Content">
                <div className="FlexForContent">
                    <div className="TopColumn">
                    <h3></h3>
                <button onClick={close} className="Close">Close</button>
                    </div>
                <h3>Role: {role}</h3>
                <h3>Company: {company}</h3>
                <h3>Location:{location}</h3>
                <h3>Description: {description}</h3>
                <h3>Contact them at: {email}</h3>
                    {deleteFunction(username,usernameOfLoggedInUser,id)}
            </div>
            </div>
        </div>
    );
}

function deleteFunction(username,usernameOfLoggedInUser,id){
    console.log(username)
    const loggedInUsername = usernameOfLoggedInUser.username.Username
    if (username === loggedInUsername){
        return <h3 className="Delete" onClick={() => DeletingMiddleware(id)}>Delete</h3>
    } else {
        return null;
    }
}
function DeletingMiddleware(description){
    const response = deletingVolunteering(description)
    console.log(response)
    if(!response) {
        <Link href="/homepage"></Link>
    }
}