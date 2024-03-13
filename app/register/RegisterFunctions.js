'use client'
import "./RegisterFunctions.css"

export function RegisterSign(){
    return(
        <div>
            <h1 className="RegisterSign">Register Here</h1>
        </div>
    );
}

export function RegisterInputs(){
    return(
        <div>
            <div className="MainFlex">
             <div className="Left">
                <div className="Flex">
                    <label>Full Name</label>
                    <input type="text" className="Input"/>
                </div>
                 <div className="Flex">
                     <label>Email</label>
                     <input type="text" className="Input"/>
                 </div>
                 <div className="Flex">
                     <label>Username</label>
                     <input type="text" className="Input"/>
                 </div>
            </div>
            <div className="Right">
                <div className="Flex">
                    <label>Password</label>
                    <input type="text" className="Input"/>
                </div>
                <div className="Flex">
                    <label>Confirm Password</label>
                    <input type="text" className="Input"/>
                </div>
            </div>
        </div>
       <input type="submit" className="Submit" value="Submit"/>
    </div>
    );
}