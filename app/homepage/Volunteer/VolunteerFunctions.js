'use client'
import "./VolunteerFunctions.css"
import {useState} from "react"
import Modal from "./VolunteerModal"
import ModalOpportunity from "./VolunteerOppurtunityModal"

export function Name(){
var [ModalOpen,SetModalOpen] = useState(false)
    console.log(ModalOpen)
    return(
        <div className="NameDiv">
            <h3></h3>
            <h3></h3>
            <h2 className="Name">Volunteering Opportunities</h2>
            <h4 className="Add" onClick={() => SetModalOpen(true)}>Add+</h4>
            <Modal open ={ModalOpen} close = {() => SetModalOpen(false)} ></Modal>
        </div>
    );
}
export function DynamicData(){

    let p = VolunteeringInformation()
    return(
        <div className="OpportunitiesDiv">
            {p}
        </div>
    );
}


function VolunteeringInformation(){
    const [modal,setModalOpen] = useState(false)
    const [email,setEmail] = useState("")
    const list = []
    const list1 = []
        list.push({
            email : "jugtejSingh"
        })
        list.push({
            email : "fedora123"
        })
    for(let x = 0; x < list.length;x++){
        list1.push(
        <div>
            <h3 onClick={() => insideClick(setModalOpen,email,setEmail, list[x].email)}>{list[x].email}</h3>
            <ModalOpportunity open={modal} close={() => setModalOpen(false)} email = {email}></ModalOpportunity>
        </div>
        )}

    return list1
}
function insideClick(setModalOpen, email,setEmail,emailAddress){
    setModalOpen(true)
    setEmail(emailAddress)
    return email
}