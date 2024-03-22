import "./Volunteer.css";
import { useEffect, useState } from "react";
import { gettingVolunteering } from "./serverVolunteer";
import Modal from "./VolunteerModal";
import ModalOpportunity from "./VolunteerOppurtunityModal";
import { IoIosAdd } from "react-icons/io";

export default function Volunteer({ user }) {
  return (
    <div className="MainDiv">
      <VolunteerTopBar username={user} />
      <VolunteerMain username={user} />
    </div>
  );
}

function VolunteerTopBar(username) {
  var [ModalOpen, SetModalOpen] = useState(false);
  return (
    <div className="VolunteerContainer">
      <div className="VolunteerTop">
        <h1 className="Name">Volunteering Opportunities</h1>
        <h4 className="Add" onClick={() => SetModalOpen(true)}>
          <IoIosAdd size={32} />
        </h4>
      </div>
      <Modal
        open={ModalOpen}
        close={() => SetModalOpen(false)}
        username={username}
      ></Modal>
    </div>
  );
}

export function VolunteerMain(username) {
  const data = DynamicData(username);
  return <div className="OpportunitiesDiv">{data}</div>;
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
        const { usernames, role, company, description, location, email, id } =
          await gettingVolunteering();
        setUsernames(usernames);
        setRole(role);
        setEmail(email);
        setLocation(location);
        setCompany(company);
        setDescription(description);
        setID(id);
        const initialModalStates = new Array(usernames.length).fill(false);
        setModalStates(initialModalStates);
      } catch (error) {
        console.log("Error fetching names");
      }
    };
    fetchInformation();
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
      <div onClick={() => clickedInside(index)}>
        <div className="FlexForInside">
          <div className="CompanyInfo">
            <h3 className="CompanyName">{company[index]}</h3>
            <h3 className="CompanyLocation">{location[index]}</h3>
          </div>
          <h3 className="text">{role[index]}</h3>
        </div>
      </div>
      <ModalOpportunity
        open={isOpen}
        close={() => closeModal(index)}
        username={usernames[index]}
        role={role[index]}
        email={email[index]}
        description={description[index]}
        location={location[index]}
        company={company[index]}
        usernameOfLoggedInUser={usernameOfLoggedInUser}
        id={id[index]}
      />
    </div>
  ));
}
