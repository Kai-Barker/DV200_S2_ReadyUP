import { Container, Row, Col } from "react-bootstrap";
import "../css/UserProfile.css";
import userPFP from "../assets/images/towelahri.jpg";
import EditProfileBTN from "../components/OutlineButton";
import OutlineButton from "../components/OutlineButtonLG";
import Tabs from "../components/Tabs";
import { Discord, Steam } from 'react-bootstrap-icons';

const dummyUser = {
  profilePic: userPFP,
  userName: "Synergyy",
  userBio: `Hey there! Im Synergyy.
Im an avid league of legends enjoyer but i enjoy playing shooter games including Fortnite, Marvel Rivals, and Overwatch 2. Other games not listed on this site i play include Monster Hunter, Peak, and Repo! `,
    friends: [
        "Rhi","caleb", "keegan", "Tim", "Kelvin" 
    ],
    platforms: [
        "Discord","Steam"
    ]
};

let tabsData = [
    {
        heading:'Summary',
        value:dummyUser.userBio,
    },
    {
        heading:'Friends',
        value: dummyUser.friends.flat(),
    }
]

const UserProfile = () => {
    const getSocialIcon = (platform) => {
  switch (platform) {
    case 'Discord':
      return <Discord className='cursor-target' style={{ marginRight: '3vw', fontSize:'10vh', color: '#73EEDC' }} />;
    case 'Steam':
      return <Steam className='cursor-target' style={{ marginRight: '3vw', fontSize:'10vh', color: '#73EEDC' }} />;
    default:
      return <Discord style={{ marginRight: '10px' }} />;
  }
};
  return (
    <div style={{ height: "80vh" }}>
      <Container fluid className="px-5 py-5">
        <Row>
          <Col lg={3}>
            {/* profile and edit profile btn */}
            <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
              <img src={dummyUser.profilePic} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "5px solid #EDE4F1" }} />
            </div>
            <div style={{marginTop:'10vh'}}>
              <OutlineButton buttonLabel={"Edit Profile"} buttonLink={"/"} />
            </div>
          </Col>
          <Col lg={{span:7, offset:1}} className="pt-2">{/* username and summary or friends */}
            <h1 className="profile-username-spacing profile-username">{dummyUser.userName}</h1>
            {/* tab switcher */}
            <div style={{height:'33vh'}}>
                <Tabs tabValues={tabsData} defaultTab="one"/>
            </div>
            <div style={{paddingTop:'5vh'}}>
            {dummyUser.platforms.map((value, index) => (
                getSocialIcon(value)
            ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
