import "./VolunteerOppurtunityModal.css"
import {useState} from "react";
export default function ModalOpportunity({open, close,username,location,email,description,company,role}){

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
                    {deleteFunction(username)}
            </div>
            </div>
        </div>
    );
}

function deleteFunction(username){
    if (username === "woody"){
        return <h3 className="Delete">Delete</h3>
    } else {
        return null;
    }
}