import { Button } from "react-bootstrap";
import "../css/ImageUploader.css";
import { useState } from "react";
import axios from "axios";

const userID = "1"; // Placeholder userID for now until i get JWT going

const FileUploader = ({ buttonLabel }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
    }
  };
  const handleSubmit = async () => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("pfp", selectedFile);
    try {
      const response = await axios.post(`http://localhost:5000/api/user/${userID}/upload_pfp`, formData, {
        //This extra param is pretty much to say its a file upload and not a standard json object? i think.
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("New image URL:", response.data.imageUrl);
    } catch (error) {
      console.log("Error uploading file" + error);
    }
  };
  return (
    <div className="outline-button-container-uploader">
      <input type="file" id="file-input" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
      <label htmlFor="file-input" className="outline-button-component-uploader  cursor-target">
        <span>{buttonLabel}</span>
      </label>

      <Button onClick={handleSubmit}>
        Upload
      </Button>
    </div>
  );
};

export default FileUploader;
