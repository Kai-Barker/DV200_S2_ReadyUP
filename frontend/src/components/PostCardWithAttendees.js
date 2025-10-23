import { Container, Row, Col } from "react-bootstrap";
import "../css/PostCard.css";
import UsernameAndPFPCard from "./UsernameAndPFPCard";

import { format, isToday, isPast, formatDistanceToNowStrict, parseISO } from "date-fns";

const PostCard = ({ profilePic, startDate, usersNeeded, usersJoined, attendees = [], onCardClick = () => {} }) => {
  let startDateOrTime = parseISO(startDate);
  const formatDateTime = (dateTime) => {
    if (isToday(dateTime)) {
      if (isPast(dateTime)) {
        return `NOW`;
      }
      return `IN \n ${formatDistanceToNowStrict(dateTime).toUpperCase()}`; //This returns the exact time to the event if its in the future, the alternative formatDistanceToNow would be cooler if it was more specific for time over 2 hours ( stupid thing says 2H-24H? )
    } else {
      return format(dateTime, "dd/MM");
    }
  };
  console.log(attendees);
  
  startDate = formatDateTime(startDateOrTime);

  return (
    <Container className="cardBorder" style={{ color: "#EDE4F1" }} onClick={onCardClick}>
      <Row>
        <Col lg={3} style={{ borderRight: "5px solid #EDE4F1" }}>
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
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>Starts:</h2>
                <h4 style={{ color: "#73EEDC" }}>{startDate}</h4>
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
              <h1 style={{ color: "#73EEDC" }}>{usersJoined}</h1>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>Need</h2>
                <h1 style={{ color: "#73EEDC" }}>{usersNeeded}</h1>
              </div>
            </Col>
          </Row>
        </Col>
          <Col lg={{ span: 4, offset: 1 }} className="my-4 d-flex flex-column gap-2">
            {attendees.map((attendee) => (
              <UsernameAndPFPCard
                key={attendee.user_id}
                username={attendee.username}
                profilePicture={attendee.profile_picture}
                userID={attendee.user_id}
              />
            ))}
          </Col>
      </Row>
    </Container>
  );
};

export default PostCard;
