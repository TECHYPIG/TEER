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
import Dropzone from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";

export default function Home() {
  const token = Cookies.get("accessToken");

  const router = useRouter();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  let user = [];
  // const [open, setOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

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
        } else {
          router.push("/login");
        }
      })
      .then((data) => {
        setUserDetails(data);
        user = data;
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => console.log("Error:", error));

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
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          {/* <ModalCustom /> */}

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

// function ModalCustom() {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "50vw",
//           bgcolor: "background.paper",
//           borderRadius: 5,

//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Create a new post
//         </Typography>
//         <TextField
//           id="outlined-multiline-static"
//           label="Share your thoughts..."
//           multiline
//           rows={4}
//           defaultValue=""
//           variant="outlined"
//           sx={{ width: "100%", mt: 2 }}
//         />
//         <Dropzone
//           acceptedFiles={["image/*"]}
//           onDrop={(acceptedFiles) => {
//             console.log(selectedImage);
//             if (acceptedFiles.length > 1) {
//               alert("You can only drop one file at a time.");
//               return;
//             }
//             setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
//           }}
//         >
//           {({ getRootProps, getInputProps }) => (
//             <section>
//               <div
//                 className="border border-gray mt-2 py-5 flex flex-col items-center justify-center w-full"
//                 {...getRootProps()}
//                 sx={{
//                   height: "200px",
//                   mt: 2,
//                   border: "1px solid #000",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: "100%", // make the dropzone the width of the modal
//                 }}
//               >
//                 <FaCloudUploadAlt size={50} />
//                 <input {...getInputProps()} />
//                 <p>Drag 'n' drop some files here, or click to select files</p>
//                 {selectedImage && (
//                   <img
//                     className="h-10"
//                     height={20}
//                     src={selectedImage}
//                     alt="Selected"
//                   />
//                 )}
//               </div>
//             </section>
//           )}
//         </Dropzone>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           onClick={() => {
//             // Upload the image
//             // ...

//             // Clear the selected image
//             setSelectedImage(null);
//           }}
//         >
//           Upload Post
//         </Button>
//       </Box>
//     </Modal>
//   );
// }
