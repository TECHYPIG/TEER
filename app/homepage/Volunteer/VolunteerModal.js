import "./VolunteerModal.css"
import {useState} from "react";
export default function Modal({open,close})
{
    const [RoleState,changedRoleState] = useState("")

    if (open === false) {
        return null
    }
        return (
            <div className="Background">
                <div className="Content">

                    <div className="Flex">
                    <button className="Close" onClick={close}>Close</button>
                        <div className="Row">
                                <div className="Column">
                                <label>Role</label>
                                <input type="text" value="" className="Input" />
                                </div>

                                <div className="Column MarginLeft">
                                <label>Email</label>
                                <input type="text" value="" className="Input"/>
                                 </div>
                        </div>
                        <div className="Row">
                            <div className="Column">
                                <label>Location</label>
                                <input type="text" value="" className="Input"/>
                            </div>

                            <div className="Column MarginLeft">
                                <label>Country</label>
                                <input type="text" value="" className="Input"/>
                            </div>
                        </div>
                            <label>Description</label>
                            <textarea value="" className="Input"/>
                        <input type="submit" className="Submit"/>
                    </div>
                    </div>
            </div>
        );
    }
function onChangeFunction(event, inputState){
    inputState(event.target.value)
}