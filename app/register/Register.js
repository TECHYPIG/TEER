import "./Register.css"
import RegisterImage from "../register/images/Tree.png"
import Image from 'next/image'
import {RegisterSign, RegisterInputs,BackToLogin} from "@/app/register/RegisterFunctions";

export function Register(){
    return(
        <div className="Register">
            <div className="ImageSection">
                <Image src={RegisterImage} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       alt="Testing" />
            </div>
            <div className="RegisterSidee">
                    <BackToLogin />
                <RegisterSign />
                <RegisterInputs />
            </div>
        </div>
    );
}