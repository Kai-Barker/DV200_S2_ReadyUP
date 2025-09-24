import { Container, Row, Col, Form } from "react-bootstrap";
import TextFieldInput from "./TextFieldInput";
import ImageUploaderCategory from "./ImageUploaderCategory";

const UpdateProfileInput = ({username,bio, setUsername, setBio, setPfp }) => {
  return (
    <Container>
      <Row>
        <Col md={12} className="d-flex flex-column gap-4">
          <TextFieldInput label={"Username"} onChangeFunction={(event) => setUsername(event.target.value)} value={username? username : ""} isMultiline={false} />
          <TextFieldInput label={"Bio"} onChangeFunction={(event) => setBio(event.target.value)} isMultiline={true} minRows={6} maxRows={6} value={bio? bio : ""} />
            <div style={{width:'auto'}}>

                <ImageUploaderCategory buttonLabel={"Edit Profile Picture"} setSelectedFile={setPfp} />
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfileInput;
