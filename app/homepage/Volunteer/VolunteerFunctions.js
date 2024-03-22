'use client'
import "./VolunteerFunctions.css"
import {useEffect, useState} from "react"
import {gettingVolunteering} from "./serverVolunteer"
import Modal from "./VolunteerModal"
import ModalOpportunity from "./VolunteerOppurtunityModal"

export function Name(username){
var [ModalOpen,SetModalOpen] = useState(false)
    return(
        <div className="NameDiv">
            <h3></h3>
            <h3></h3>
            <h2 className="Name">Volunteering Opportunities</h2>
            <h4 className="Add" onClick={() => SetModalOpen(true)}>Add+</h4>
            <Modal open ={ModalOpen} close = {() => SetModalOpen(false)} username={username} ></Modal>
        </div>
    );
}
export function InsideVolunteer(username){
    const data = DynamicData(username)
    return(
        <div className="OpportunitiesDiv">
            {data}
        </div>
    )
    }

    function DynamicData(usernameOfLoggedInUser) {
        const [usernames, setUsernames] = useState([]);
        const [role, setRole] = useState([]);
        const [company, setCompany] = useState([]);
        const [description, setDescription] = useState([]);
        const [location, setLocation] = useState([]);
        const [email, setEmail] = useState([]);
        const [id, setID] = useState([]);

        useEffect(() => {
            const fetchInformation = async () => {
                try {
                    const {usernames, role, company, description, location, email, id} = await gettingVolunteering();
                    setUsernames(usernames)
                    setRole(role)
                    setEmail(email)
                    setLocation(location)
                    setCompany(company)
                    setDescription(description)
                    setID(id)
                    const initialModalStates = new Array(usernames.length).fill(false);
                    setModalStates(initialModalStates);
                } catch (error) {
                }
            };
            fetchInformation()
        }, []);
        const [modalStates, setModalStates] = useState([]); // Example array of modal states
        const clickedInside = (index) => {
            const updatedModalStates = modalStates.slice();
            updatedModalStates[index] = true;
            setModalStates(updatedModalStates);
        };

        const closeModal = (index) => {
            const updatedModalStates = modalStates.slice();
            updatedModalStates[index] = false;
            setModalStates(updatedModalStates);
        };

        // Render the divs and modal windows
        return modalStates.map((isOpen, index) => (
            <div key={index}>
                <div onClick={() => clickedInside(index)} className="Border">
                    <div className="FlexForInside">
                        <h3>{role[index]}</h3>
                        <h3></h3>
                        <h3>{location[index]}</h3>
                    </div>
                        {company[index]}
                    </div>
                <ModalOpportunity open={isOpen} close={() => closeModal(index)} username={usernames[index]}
                role ={role[index]} email ={email[index]} description={description[index]} location={location[index]}
                company={company[index]} usernameOfLoggedInUser={usernameOfLoggedInUser} id={id[index]}/>
            </div>
        ));
    }