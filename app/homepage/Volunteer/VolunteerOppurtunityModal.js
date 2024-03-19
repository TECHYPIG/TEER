import "./VolunteerOppurtunityModal.css"
import {useState} from "react";
export default function ModalOpportunity({open,close,email})
{
    if (open === false) {
        return null
    }
    return (
        <div className="Background">
            <div className="Content">
                <button onClick={close}>Close</button>
                <h3>Contact them at :{email}</h3>
            </div>
        </div>
    );
}
