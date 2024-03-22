'use client'
import "./RegisterFunctions.css"
import {useState} from "react";
import crypto from "crypto"
import {locations} from "./countries"
import Link from "next/link";

export function RegisterSign(){
    return(
        <div>
            <h1 className="RegisterSign">Register Here</h1>
        </div>
    );
}

export function BackToLogin(){
    return(
        <div>
            <Link href="/">
            <button className="BackToLoginButton">Login</button>
            </Link>
        </div>
    );
}

export function RegisterInputs(){
    const [username,changedUsername] = useState("")
    const [password,changedPassword] = useState("")
    const [email,changedEmail] = useState("")
    const [fullName,changedFullname] = useState("")
    const [confirmPassword,changedConfirmPassword] = useState("")
    const [location,changedLocation] = useState("")
    const [gender,changedGender] = useState("")
    const [birthDate,changedBirthDate] = useState("")
    const [dontMatch, ChangedDontMatch] = useState("")
    // The inputs for the register function
    return(
        <div className="MainFlexx">
             <div className="Row">
                <div className="Flex">
                    <label>Username</label>
                    <input type="text" className="Input" value={username}
                           onChange ={event => onChangeFunction(event,changedUsername)}/>
                </div>
                 <div className="Flex MarginLeft">
                     <label>Email</label>
                     <input type="text" className="Input" value={email}
                            onChange ={event => onChangeFunction(event,changedEmail)}/>
                 </div>
             </div>

            <div className="Row">
                 <div className="Flex">
                     <label>Location</label>
                     <select  className="Input" onChange ={event => onChangeFunction(event,changedLocation)}>
                         {locations}
                     </select>
                 </div>
                <div className="Flex MarginLeft">
                    <label>Gender</label>
                    <select className="Input" value={gender} onChange ={event => onChangeFunction(event,changedGender)}>
                        <option key="SelectOne">Select One</option>
                        <option key="Male">Male</option>
                        <option key="Female">Female</option>
                        <option key="Others">Others</option>
                        <option key="PreferNotToSay">Prefer Not To Say</option>
                    </select>
                </div>
                </div>

            <div className="Row">
                <div className="Flex">
                    <label>Full Name</label>
                    <input type="text" className="Input" value={fullName}
                           onChange ={event => onChangeFunction(event,changedFullname)}/>
                </div>
                <div className="Flex MarginLeft">
                    <label>Birth Date</label>
                    <input type="date" id="Date" className="Input" onChange ={event => onChangeFunction(event,changedBirthDate)}/>
                </div>
            </div>

            <div className="Row">
                <div className="Flex">
                    <label>Password</label>
                    <input type="text" className="Input" value={password}
                           onChange ={event => onChangeFunction(event,changedPassword)}/>

                </div>

                <div className="Flex MarginLeft">
                    <label>Confirm Password</label>
                    <input type="text" className="Input" value={confirmPassword}
                           onChange ={event => onChangeFunction(event,changedConfirmPassword)}/>
                </div>
                </div>

            <div className="passwordsDontMatch"><h5>{dontMatch}</h5></div>

       <input type="Submit" onClick={async function inside (){
           //Calling the function and then checking return values to see if there was an error

           let value = await registerInformation(username,location, password,confirmPassword,birthDate,fullName,gender,email,ChangedDontMatch);
           switch (value) {
               case 0:
                   ChangedDontMatch("Your passwords do not match")
                   break;
               case 10:
                   ChangedDontMatch("Username is empty");
                   break;
               case 11:
                   ChangedDontMatch("Username length is too short");
                   break;
               case 20:
                   ChangedDontMatch("Password is empty");
                   break;
               case 30:
                   ChangedDontMatch("Your Confirmed Password is empty");
                   break;
               case 40:
                   ChangedDontMatch("Birth Date is empty or invalid");
                   break;
               case 50:
                   ChangedDontMatch("Your name is empty");
                   break;
               case 60:
                   ChangedDontMatch("Location is empty");
                   break;
               case 70:
                   ChangedDontMatch("Gender is empty");
                   break;
               case 80:
                   ChangedDontMatch("Email is empty");
                   break;
               case 100:
                   ChangedDontMatch("Please write Fullname as 'FirstName' 'Surname'");
                   break;
               case 101:
                   ChangedDontMatch("Please do not write middle name");
                   break;
           }
       }}
              className="Submit" value="Submit"/>
    </div>
    );
}

//These update the change in the inputs using useStates as react/next dont allow it
function onChangeFunction(event, inputState){
    inputState(event.target.value)
}
//The function that gets called when submit is called.
async function registerInformation(username,location, password,confirmPassword,birthDate,fullName,gender,email,ChangedDontMatch){
    if(username === ""){
        return 10
    }
    if(username.length < 5){
        return 11
    }
    if(email === ""){
        return 80
    }
    var valueDate = document.getElementById('Date').value;

    if(!Date.parse(valueDate)){
        return 40
    }
    if(fullName === ""){
        return 50
    }
    if(location === "Select One"){
        return 60
    }
    if(gender === "Select One"){
        return 70
    }
    if(password === ""){
        return 20
    }
    if(confirmPassword === ""){
        return 30
    }
    var firstname
    var surname
    //This splits fullname in both first and surname.
    let nameSplit = fullName.split(" ");
    if(nameSplit[1] === undefined){
        return 100;
    }
    else if(nameSplit[2] !== undefined){
         return 101;
        }
     else{
       firstname = nameSplit[0];
        surname = nameSplit[1];
    }
    if (password !== confirmPassword){
        return 0;
    } else{
        ChangedDontMatch("")
        //Hashes the password so it can be put into the database.
        let hashedPassword = crypto.createHash("sha256").update(password).digest('hex')
            //API call
            try{
               let response =  await fetch('/api/register', {
                    method: 'POST', // Adjust the method as needed (GET, POST, etc.)
                    'Content-Type': 'application/json',
                    body: JSON.stringify({username : username,
                                                password : hashedPassword,
                                                firstname : firstname,
                                                surname : surname,
                                                email : email,
                                                birthDate : birthDate,
                                                gender : gender,
                                                location : location
                    })
                });
               let responseStatus = response.status;
                if (responseStatus === 200){
                    ChangedDontMatch("You have been registered successfully")
                } else if(responseStatus === 501){
                    ChangedDontMatch("Please choose a new username or email")
                } else if(responseStatus === 500){
                    ChangedDontMatch("There was an issue,Please try again in a bit")
                }
            }
            catch (error){
                console.log(error);
            }
        }
    }