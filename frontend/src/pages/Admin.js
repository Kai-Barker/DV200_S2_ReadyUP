import "../css/Admin.css";
import CategoryAdmin from "../components/CategoryAdmin";
import dummyImg from "../assets/images/FN PlaceHolder.png";
import { Container, Row, Col } from "react-bootstrap";
import PostAdmin from "../components/ReportedPost";


const dummyData = {
  image: dummyImg,
  title: "Fortnite",
  numPosts: 73,
};
const dummyPost = {
      title: "Casual Duos - Just Vibin'",
      description:
        "Looking to run some casual Duos, no sweat. Just here for good vibes and a few Victory Royales. Mic preferred but not required. NA-E, chill players only",
      tags: ["Mic Required", "18+", "Duos", "ZeroBuild"],
}

const Admin = () => {
  return (
    <div className="admin-page">
      <h1 className="admin-heading">Reported Categories</h1>
      <Container fluid className="px-5">
        {/* <Row>

        </Row> */}
        <Row className="gx-5">
          <Col md={3}>
            <CategoryAdmin
              image={dummyData.image}
              title={dummyData.title}
              numPosts={dummyData.numPosts}
              onDelete={() => {
                console.log("Delete Category");
              }}
            />
          </Col>
        </Row>
      </Container>
      <h1 className="admin-heading">Reported Posts</h1>
      <Container fluid className="px-5">
        {/* <Row>

        </Row> */}
        <Row className="gx-5">
          <Col md={3}>
            <PostAdmin
              post = {dummyPost}
              onIgnore={() => {
                console.log("Ignore Post");
              }}
              onDelete={() => {
                console.log("Delete Post");
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
