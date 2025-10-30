import { Container, Row, Col, Form } from "react-bootstrap";
import TextFieldInput from "./TextFieldInput";
import { useState } from "react";
import DateTimePicker from "../components/DateTimePicker";
import { useEffect } from "react";
import OutlineButtonFunction from "./OutlineButtonFunction";
import { useParams } from "react-router-dom";
import api from "../api";
import PostTags from "./PostTags";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";

const CreatePost = ({ refresh, setOpen, currentTags }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [numPlayers, setNumPlayers] = useState(1);
  const [tags, setTags] = useState([]);
  const { gameTitle } = useParams();
  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const handleNumPlayers = (e) => {
    let inputNumPlayers = e.target.value;
    console.log(inputNumPlayers);

    if (inputNumPlayers > 16) {
      setNumPlayers(16);
    } else if (inputNumPlayers < 0) {
      setNumPlayers(0);
    } else {
      setNumPlayers(inputNumPlayers);
    }
  };
  const handleSubmit = async () => {
    console.log(title);

    const postData = {
      title: title,
      description: description,
      startDate: startDate ? startDate.toISOString() : null,
      numPlayers: numPlayers,
      categoryName: gameTitle,
      tags: tags.map((tag) => tag.tag_name),
    };
    console.log(postData);

    if (!postData.title || !postData.description || !postData.startDate || !postData.numPlayers || !postData.categoryName) {
      alert("fill in all fields");
      return;
    }
    try {
      const response = await api.post("/lfg/post", postData);
      console.log("created post", response.data);
      toast.success("Post created successfully!");
      ReactGA.event("create_post", {
        post_category: postData.categoryName
      });
      refresh();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create post", error);
      toast.error("Failed to create post");
    }
  };
  useEffect(() => {
    console.log(startDate);
    console.log(gameTitle);
  }, [startDate]);
  return (
    <Container>
      <Row className="g-4">
        <Col md={7} className="d-flex flex-column gap-4">
          <TextFieldInput label={"Title"} onChangeFunction={(event) => setTitle(event.target.value)} isMultiline={false} />
          <TextFieldInput label={"Description"} onChangeFunction={(event) => setDescription(event.target.value)} isMultiline={true} minRows={10} maxRows={10} />
        </Col>
        <Col md={{ span: 4, offset: 1 }} className="d-flex flex-column gap-4">
          <DateTimePicker label={"Start Time"} onChangeFunction={setStartDate} value={startDate} />
          <TextFieldInput
            label={"Number of Players"}
            onChangeFunction={handleNumPlayers}
            isMultiline={false}
            minRows={1}
            maxRows={1}
            isNumeric={true}
            value={numPlayers}
          />
          <PostTags tags={tags} setTags={setTags} currentTags={currentTags} />
        </Col>
      </Row>
      <Row style={{ marginTop: "5vh" }}>
        <Col md={2} style={{ width: "auto" }}>
          <OutlineButtonFunction buttonLabel={"Post"} buttonFunction={handleSubmit} />
        </Col>
      </Row>
    </Container>
  );
};
export default CreatePost;
