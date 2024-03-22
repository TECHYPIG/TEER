import "./Volunteer.css";
import { useEffect, useState } from "react";
import { gettingVolunteering } from "./serverVolunteer"; 
import CustomModal from "./VolunteerModal";
import ModalOpportunity from "./VolunteerOppurtunityModal";
import { IoIosAdd } from "react-icons/io";


export default function Volunteer({
  user,
  VolunteerSuccess,
  VolunteerError,
  VolunteerLoading,
}) {
  return (
    <div className="MainDiv">
      <VolunteerTopBar
        username={user}
        VolunteerSuccess={VolunteerSuccess}
        VolunteerError={VolunteerError}
        VolunteerLoading={VolunteerLoading}
      />
      <VolunteerMain username={user} />
    </div>
  );
}

function VolunteerTopBar(
  {username,
  VolunteerSuccess,
  VolunteerError,
  VolunteerLoading}
) {
  //Modal opening and closing state.
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="VolunteerContainer">
      <div className="VolunteerTop">
        <h1 className="Name">Volunteering Opportunities</h1>
        <h4 className="Add" onClick={() => handleOpen()}>
          <IoIosAdd size={32} />
        </h4>
      </div>
      //The custom modal code
      <CustomModal
        user={username}
        VolunteerSuccess={VolunteerSuccess}
        VolunteerError={VolunteerError}
        VolunteerLoading={VolunteerLoading}
        isOpen={open}
        onHandleClose={handleClose}
        onHandleOpen={handleOpen}
      />
      {/* <Modal
        open={ModalOpen}
        close={() => SetModalOpen(false)}
        username={username}
        VoluneerSuccess={VoluneerSuccess}
        VoluneerError={VoluneerError}
        VoluneerLoading={VoluneerLoading}
      ></Modal> */}
    </div>
  );
}

//the second modal which is the dynamic one.
export function VolunteerMain(username) {
  const data = DynamicData(username);
  return <div className="OpportunitiesDiv">{data}</div>;
}

//This is the code that shows the current volunteers in database and displays them.
function DynamicData(usernameOfLoggedInUser) {
  const [usernames, setUsernames] = useState([]);
  const [role, setRole] = useState([]);
  const [company, setCompany] = useState([]);
  const [description, setDescription] = useState([]);
  const [location, setLocation] = useState([]);
  const [email, setEmail] = useState([]);
  const [id, setID] = useState([]);

  //This use effect is what gets the volunteer information out of the database.
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

  //code for opening and closing a modal
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
  //Map that holds the information
  //Renders the divs and modal windows
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
