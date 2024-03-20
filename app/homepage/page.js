"use client";
import styles from "./Page.module.css";
import Navbar from "./Navbar";
import Userprofile from "./Userprofile";
import Newpostcontent from "./NewPost";
import Postcontent from "./Post";
import Voluneer from "./Volunteer/Volunteer";
import Newfollow from "./Newfollow";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Dropzone from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Home() {
  const token = Cookies.get("accessToken");
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch("/api/post/fetchPostsByFollowedUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className={styles.homecontainer}>
      <Navbar></Navbar>
      <div className={styles.innerdiv}>
        <Userprofile></Userprofile>
        <div className={styles.row2}>
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50vw",
                height: "50vh",
                bgcolor: "background.paper",
                borderRadius: 5,

                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create a new post
              </Typography>
              <TextField
                id="outlined-multiline-static"
                label="Share your thoughts..."
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
                sx={{ width: "100%", mt: 2 }}
              />
              <Dropzone
                acceptedFiles={["image/*"]}
                onDrop={(acceptedFiles) => {
                  if (acceptedFiles.length > 1) {
                    alert("You can only drop one file at a time.");
                    return;
                  }
                  console.log("Accepted file:", acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div className="border border-gray mt-2 py-5 flex flex-col items-center justify-center w-full"
                      {...getRootProps()}
                      sx={{
                        height: "200px",
                        mt: 2,
                        border: "1px solid #000",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%", // make the dropzone the width of the modal
                      }}
                    >
                      <FaCloudUploadAlt size={50} />
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Upload Post
              </Button>
            </Box>
          </Modal>

          <Newpostcontent></Newpostcontent>
          {posts.map((post, index) => (
            <Postcontent key={index} post={post} />
          ))}
        </div>
        <div className={styles.row3}>
          <Voluneer></Voluneer>
          <Newfollow></Newfollow>
        </div>
      </div>
    </div>
  );
}
