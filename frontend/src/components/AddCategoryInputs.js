import Form from "react-bootstrap/Form";
import { useState } from "react";
import api from "../api";
import ImageUploaderCategory from "./ImageUploaderCategory";
import OutlineButton from "./OutlineButtonFunction";
import { Col, Row, Container } from "react-bootstrap";
import GameCatCard from "./GameCatCard";
import "../css/AddCategoryInputs.css";

const AddCategoryInputs = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    console.log("running submit");

    if (!selectedFile || !categoryTitle) {
      setErrorMessage("Please fill in all fields");
      console.log("Please fill in all fields");

      return;
    }
    const formData = new FormData();
    formData.append("category_picture", selectedFile);
    formData.append("title", categoryTitle);
    formData.append("description", categoryDescription);
    try {
      const response = await api.post(`/lfg/create_category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Category created:", response.data);
      setSelectedFile(null);
      setCategoryTitle("");
      setCategoryDescription("");
    } catch (error) {
      console.error("Error uploading file" + error);
      setErrorMessage("Error creating category" + error);
    }
  };
  return (
    <Container fluid>
      <Row>
        <Col lg={5}>
          <Form>
            <Form.Group controlId="formCategoryName" className="mb-3">
              <Form.Label className="admin-form-label">Category Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" onChange={(e) => setCategoryTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formCategoryDescription" className="mb-3">
              <Form.Label className="admin-form-label">Category Description</Form.Label>
              <Form.Control type="text" placeholder="Enter category description" onChange={(e) => setCategoryDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-4">
              {/* 6. Pass a className to your uploader */}
              <ImageUploaderCategory buttonLabel={"Choose Category Image"} setSelectedFile={setSelectedFile} className="admin-image-uploader" />
            </Form.Group>
            <Form.Group className="mt-4">
              <OutlineButton buttonLabel={"Add Category"} buttonFunction={handleSubmit} />
            </Form.Group>
          </Form>
        </Col>
        <Col lg={{ span: 5, offset: 1 }} className="admin-preview-col">
          <h2 className="admin-heading">Live Preview</h2>
          <GameCatCard image={selectedFile ? URL.createObjectURL(selectedFile) : null} title={categoryTitle || "LFG Category"} numPosts={0} />
        </Col>
      </Row>
    </Container>
  );
};

export default AddCategoryInputs;
