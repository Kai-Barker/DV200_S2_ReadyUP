import { Button } from "react-bootstrap";
import "../css/ImageUploader.css";
import { useState } from "react";
import api from "../api";

//Copy pasted from my image uploader but modified for categories
const ImageUploaderCategory = ({ buttonLabel, setSelectedFile }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file);
    }
  };
//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       return;
//     }
//     const formData = new FormData();
//     formData.append("pfp", selectedFile);
//     try {
//       const response = await api.post(`/lfg/category_picture`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("New image URL:", response.data.imageUrl);
//     } catch (error) {
//       console.log("Error uploading file" + error);
//     }
//   };
  return (
    <div className="outline-button-container-uploader">
      <input type="file" id="file-input" style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
      <label htmlFor="file-input" className="outline-button-component-uploader  cursor-target">
        <span>{buttonLabel}</span>
      </label>
{/* 
      <Button onClick={handleSubmit}>
        Upload
      </Button> */}
    </div>
  );
};

export default ImageUploaderCategory;
