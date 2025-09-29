import { Container, Row, Col } from "react-bootstrap";
import "../css/PostCard.css";
import Tag from "../components/Tag";
import dayjs from 'dayjs';

import { format, isToday, isPast, formatDistanceToNowStrict, parseISO } from "date-fns"; 

const PostCard = ({profilePic, startDate, usersNeeded, usersJoined, title, description, tags}) => {
  console.log(startDate);
  
  let startDateOrTime = parseISO(startDate);
  console.log(startDate);
  console.log(startDateOrTime);
  
  
  const formatDateTime = (dateTime) => {
    if (isToday(dateTime)) {
      if (isPast(dateTime)) {
        return `NOW`;
      }
      return `IN \n ${formatDistanceToNowStrict(dateTime).toUpperCase()}`; //This returns the exact time to the event if its in the future, the alternative formatDistanceToNow would be cooler if it was more specific for time over 2 hours ( stupid thing says 2H-24H? )
    }
    else {
      return format(dateTime, "dd/MM");
    }
  }
  startDate = formatDateTime(startDateOrTime);
  
  
  return (
    <Container className="cardBorder" style={{color:"#EDE4F1"}}>
      <Row>
        <Col lg={3} style={{borderRight:'5px solid #EDE4F1'}}>
          {/* pfp */}
          <Row className="my-4">
            <Col style={{ justifyContent: "center", display: "flex" }}>
              <div
                style={{
                  width: "15vh",
                  height: "15vh",
                  objectPosition: "center",
                }}
              >
                <img
                  src={profilePic}
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "5px solid #EDE4F1",
                    aspectRatio: "1 / 1",
                  }}
                />
              </div>
            </Col>
            <Col className="post-card-align-text">
            <div style={{display:'flex', flexDirection:'column' ,alignItems:'center'}}>
              <h2>Starts:</h2>
              <h4 style={{color:"#73EEDC"}}>{startDate}</h4>
              </div>
            </Col>
          </Row>
          <Row className="my-2">
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>Have</h2>
              <h1 style={{color:"#73EEDC"}}>{usersJoined}</h1>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',

              }}
            >
            <div style={{display:'flex', flexDirection:'column' ,alignItems:'center'}}>
              <h2>Need</h2>
              <h1 style={{color:"#73EEDC"}}>{usersNeeded}</h1>
            </div>
            </Col>
          </Row>
        </Col>
        <Col lg={5} className="my-4 mx-4">
          <h2 className="my-2">{title}</h2>
          <p style={{ fontSize: "20px" }}>{description}</p>
        </Col>
        <Col lg={3}  className="d-flex flex-wrap gap-3 my-4 mx-4" style={{ alignItems: "flex-start", alignContent: 'flex-start' }}>
          {/* tags */}
          {tags && tags.map((tagText, index) => (
            <Tag key={index} tagText={tagText} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PostCard;
