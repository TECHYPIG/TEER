import "./VolunteerOppurtunityModal.css";
import { deletingVolunteering } from "./serverVolunteer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

export default function ModalOpportunity({
  open,
  close,
  username,
  location,
  email,
  description,
  company,
  role,
  usernameOfLoggedInUser,
  id,
}) {
  if (open === false) {
    return null;
  }

  return (
    <div className="Background">
      <div className="Content">
        <div className="FlexForContent">
          <div className="TopColumn">
            <h1 className="Title">Add a volunteering opportunity</h1>
            <button className="Close" onClick={close}>
              <IoCloseOutline size={26} />
            </button>
          </div>

          <table className="table">
            <tr className="row">
              <td className="cell">
                <strong className="label">Role:</strong>
              </td>
              <td className="data">{role}</td>
            </tr>
            <tr className="row">
              <td className="cell">
                <strong className="label">Company:</strong>
              </td>
              <td className="data">{company}</td>
            </tr>
            <tr className="row">
              <td className="cell">
                <strong className="label">Location:</strong>
              </td>
              <td className="data">{location}</td>
            </tr>
            <tr className="row">
              <td className="cell">
                <strong className="label">Description:</strong>
              </td>
              <td className="data">{description}</td>
            </tr>
            <tr className="row">
              <td className="cell">
                <strong className="label">Contact them at:</strong>
              </td>
              <td className="data">{email}</td>
            </tr>
          </table>
          <div className="DeleteButton">
          {deleteFunction(username, usernameOfLoggedInUser, id)}
          </div>
        </div>
      </div>
    </div>
  );
}

function deleteFunction(username, usernameOfLoggedInUser, id) {
  console.log(username);
  //This checks if the volunteer post and the current logged in user is the same or not
  const loggedInUsername = usernameOfLoggedInUser.username.Username;
  if (username === loggedInUsername) {
    return (
      <h3 className="Delete" onClick={() => DeletingMiddleware(id)}>
        Delete
      </h3>
    );
  } else {
    return null;
  }
}
function DeletingMiddleware(description) {
  const response = deletingVolunteering(description);
  console.log(response);
  if (!response) {
    <Link href="/homepage"></Link>;
  }
}
