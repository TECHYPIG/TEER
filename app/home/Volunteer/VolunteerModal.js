import "./Volunteer.css";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./Volunteer.css";
import SendIcon from "@mui/icons-material/Send";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CustomModal({
  isOpen,
  onHandleClose,
  user,
  VolunteerSuccess,
  VolunteerError,
  VolunteerLoading,
}) {
  const [errorText, setErrorText] = useState("");

  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  async function handleSumbit() {
    console.log("Button Clicked");
    const value = volunteerPushing(
      email,
      user,
      location,
      company,
      description,
      role
    );
    switch (value) {
      case 20:
        setErrorText("Your company field is empty");
        VolunteerError("Your company field is empty");
        break;
      case 30:
        setErrorText("Your description is empty");
        VolunteerError("Your description is empty");
        break;
      case 40:
        setErrorText("Your email is empty");
        VolunteerError("Your email is empty");
        break;
      case 50:
        setErrorText("Your location is empty");
        VolunteerError("Your location is empty");
        break;
      case 60:
        setErrorText("Your role is empty");
        VolunteerError("Your role is empty");
        break;
      case 200:
        setErrorText("Your job has been added");
        VolunteerError("Your job has been added");
        break;
    }
  }
  return (
    <Modal
      open={isOpen}
      onClose={onHandleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "55vw",
          bgcolor: "background.paper",
          borderRadius: 5,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create a new Volunteering Opportunity
        </Typography>
        <div className="Flex">
          <div className="Row">
            <div className="Column">
              <label>Company</label>
              <input
                type="text"
                className="Input"
                value={user.Company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </div>

            <div className="Column MarginLeft">
              <label>Role</label>
              <input
                type="text"
                value={user.role}
                className="Input"
                onChange={(event) => setRole(event.target.value)}
              />
            </div>
          </div>
          <div className="Row">
            <div className="Column">
              <label>Location</label>
              <input
                type="text"
                className="Input"
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>

            <div className="Column MarginLeft">
              <label>Email</label>
              <input
                type="text"
                className="Input"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <label className="mt-10">Description</label>
          <textarea
            className="Input"
            onChange={(event) => setDescription(event.target.value)}
          />
          <h3 className="ErrorText">{errorText}</h3>
        </div>
        <Button
          variant="contained"
          className="uploadButton"
          endIcon={<SendIcon />}
          onClick={() => {
            handleSumbit();
          }}
        >
          Upload Post
        </Button>
      </Box>
    </Modal>
  );

  async function volunteerPushing(
    email,
    username,
    location,
    company,
    description,
    role
  ) {
    if (company === "" || company === undefined) {
      console.log(company);
      VolunteerError("Your company field is empty");
      return 20;
    }
    if (role === "" || company === undefined) {
      VolunteerError("Your role is empty");
      return 60;
    }
    if (location === "" || company === undefined) {
      VolunteerError("Your location is empty");
      return 50;
    }
    if (email === "" || company === undefined) {
      VolunteerError("Your email is empty");
      return 40;
    }

    if (description === "" || company === undefined) {
      VolunteerError("Your description is empty");
      return 30;
    }

    console.log("Button this dar");
    VolunteerLoading("Adding job");
    let response = await fetch("/api/volunteer", {
      method: "POST", // Adjust the method as needed (GET, POST, etc.)
      "Content-Type": "application/json",
      body: JSON.stringify({
        username: username,
        company: company,
        description: description,
        email: email,
        location: location,
        role: role,
      }),
    });
    if (response.status === 200) {
      VolunteerSuccess("Your job has been added");
      return 200;
    } else {
      VolunteerError("There was an error");
      return 500;
    }
  }
}
