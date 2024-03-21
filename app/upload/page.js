"use client";
import { useDropzone } from "react-dropzone";
import styles from "./Home.module.css";
import { useCallback, useState, useMemo } from "react";
import axios from "axios";

export default function Home() {
  const [selectedImages, setSelectedImages] = useState([]);
  // Add this
  const [uploadStatus, setUploadStatus] = useState("");
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
        console.log(file);
      setSelectedImages((prevState) => [...prevState, file]);
    });
  
    // Log rejected files
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

  // Add this
  const onUpload = async () => {
    setUploadStatus("Uploading....");
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("file", image);
    });
    try {
      const response = await axios.post("/api/post/createPost", formData);
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
    <div className={styles.page}>
      <div className={styles.container}>
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

        {selectedImages.length > 0 && (
          <div className={styles.btn}>
            <button onClick={onUpload}>Upload to Cloudinary</button>
            <p>{uploadStatus}</p>
          </div>
        )}
      </div>
      <button onClick={clearData}>Clear</button>
    </div>
  );
}
