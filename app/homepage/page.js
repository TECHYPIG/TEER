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
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const token = Cookies.get("accessToken");
  const router = useRouter();
  const [userDetails, setUserDetails] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    if (token == undefined) {
      router.push("/login");
    }
    getUserDetails(token).then((data) => {
      setUserDetails(data);
      if (userDetails == []) {
        router.push("/login");
      }
      getPosts(token).then((data) => {
        setPosts(data);
      });
      getFollowers(token).then((data) => {
        setFollowers(data);
        setIsLoading(false);
      });
    });
  }, [token]);

  return (
    <div className={styles.homecontainer}>
      <Navbar />
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.innerdiv}>
          <Userprofile user={userDetails} />
          <div className={styles.row2}>
            <ModalCustom
              isOpen={open}
              onHandleClose={handleClose}
              onHandleOpen={handleOpen}
              token={token}
            />
            <Newpostcontent user={userDetails} onHandleOpen={handleOpen} />
            {userDetails &&
              posts.map((post, index) => (
                <Post key={index} post={post} userDetails={userDetails} />
              ))}
          </div>
          <div className={styles.row3}>
            <Voluneer user={userDetails}></Voluneer>
            <Newfollow followers={followers} setFollowers={setFollowers} />
          </div>
        </div>
      )}
    </div>
  );
}

const getUserDetails = async (token) => {
  try {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

const getFollowers = async (token) => {
  try {
    const response = await fetch("/api/followsuggestions", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching followers:", error);
  }
};

const getPosts = async (token) => {
  try {
    const response = await fetch("/api/post/fetchPostsByFollowedUsers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

function ModalCustom({ isOpen, onHandleClose, token }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [modalText, setModalText] = useState("");
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
  } = useDropzone({ onDrop, accept: "image/*", maxFiles: 1 });

  const style = useMemo(
    () => ({
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {}),
    }),
    [isDragAccept, isDragReject]
  );

  // Add this
  const onUpload = async () => {
    setUploadStatus("Uploading....");
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("file", image);
    });
    formData.append("content", modalText);
    try {
      const response = await axios.post("/api/post/createPost", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUploadStatus("upload successful");
    } catch (error) {
      console.log("imageUpload" + error);
      setUploadStatus("Upload failed..");
    }
  };
  const clearData = () => {
    setSelectedImages([]);
    setUploadStatus("");
  };

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
          endIcon={<SendIcon />}
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
