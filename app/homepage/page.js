"use client";
import styles from "./Page.module.css";
import Navbar from "./Navbar";
import Userprofile from "./Userprofile";
import Newpostcontent from "./NewPost";
import Post from "./Post";
import Voluneer from "./Volunteer/Volunteer";
import Newfollow from "./Newfollow";
import Cookies from "js-cookie";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";
import { useEffect, useState, useCallback, useMemo} from "react";
import axios from "axios";

export default function Home() {
  const token = Cookies.get("accessToken");

  const router = useRouter();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [modalText, setModalText] = useState("");
  let user = [];
  const [selectedImage, setSelectedImage] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  // Add this
  const onUpload = async () => {
    setUploadStatus("Uploading....");
    const formData = new FormData();
    selectedImage.forEach((image, index) => {
      formData.append("file" + index, image);
    });

    try {
      const response = await axios.post("/api/post/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setUploadStatus("upload successful");
    } catch (error) {
      console.log("imageUpload" + error);
      setUploadStatus("Upload failed..");
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    fetch("/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 500) {
          return router.push("/login");
        } else {
          return router.push("/login");
        }
      })
      .then((data) => {
        setUserDetails(data);
        user = data;
        setIsLoading(false);
        console.log(data);
      });

    if (userDetails == []) {
      router.push("/login");
    }
    fetch("/api/post/fetchPostsByFollowedUsers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [token]);

  return (
    <div className={styles.homecontainer}>
      <Navbar></Navbar>
      <div className={styles.innerdiv}>
        <Userprofile></Userprofile>
        <div className={styles.row2}>
          <Button onClick={handleOpen}>Open modal</Button>
          <ModalCustom open handleClose handleOpen/>

          <Newpostcontent></Newpostcontent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            userDetails &&
            posts.map((post, index) => (
              <Post key={index} post={post} userDetails={userDetails} />
            ))
          )}
        </div>
        <div className={styles.row3}>
          <Voluneer user={userDetails}></Voluneer>
          <Newfollow></Newfollow>
        </div>
      </div>
    </div>
  );
}

function ModalCustom( {open, handleClose, handleOpen}) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log(file);
      setSelectedImages((prevState) => [...prevState, file]);
    });
    rejectedFiles.forEach((file) => {
      console.log(`File ${file.name} was rejected.`);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*" });

  const style = useMemo(
    () => ({
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {}),
    }),
    [isDragAccept, isDragReject]
  );

  const onUpload = async () => {
    setUploadStatus("Uploading....");
    const formData = new FormData();
    formData.append("file", selectedImage);
    try {
      const response = await axios.post("/api/post/createPost", formData);
      console.log(response.data);
      setUploadStatus("upload successful");
    } catch (error) {
      console.log("imageUpload" + error);
      setUploadStatus("Upload failed..");
    }
  };

  return (
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
          onChange={(e) => {
            setModalText(e.target.value);
          }}
        />
        <div className={styles.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop file(s) here ...</p>
          ) : (
            <p>Drag and drop file(s) here, or click to select files</p>
          )}
        </div>
        <div className={styles.images}>
          {selectedImages.length > 0 &&
            selectedImages.map((image, index) => (
              <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
            ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => {
            onUpload();
          }}
        >
          Upload Post
        </Button>
      </Box>
    </Modal>
  );
}
