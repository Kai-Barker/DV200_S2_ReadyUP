
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";

// 1. Import icons as URLs to be used in <img> tags
import friendsIconUrl from "../assets/images/FriendsIcon.png";
import friendsRequestUrl from "../assets/images/friendRequests.svg";

import UsernameAndPFPCard from "./UsernameAndPFPCard";
// 2. Import your TabsComponent (assuming the file is ./Tabs.js)
import TabsComponent from "./Tabs";

import SearchBar from "./SearchBar";

let attendees = [
  {
    username: "KERIA",
    user_id: 2,
    profile_picture: "https://res.cloudinary.com/dnejh9nvy/image/upload/v1759832627/v4jdid8dm9dq2yqrowyt.jpg",
  },
  {
    username: "Synergyy",
    user_id: 1,
    profile_picture: "https://res.cloudinary.com/dnejh9nvy/image/upload/v1759940521/bz7ms5ero88vled0nzbh.webp",
  },
];

const ImgIcon = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ height: "40px", width: "40px" }} />
);

export default function FriendsList({ open, onClose }) {
  
  const AddFriendPanel = (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <List>
        {attendees.map((attendee) => (
          <ListItem key={attendee.user_id} disablePadding>
            <ListItemButton onClick={onClose}>
              <UsernameAndPFPCard
                username={attendee.username}
                profilePicture={attendee.profile_picture}
                userID={attendee.user_id}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const FriendRequestPanel = (
    <Box>
      <Box component="p" sx={{ px: 2, pt: 2, m: 0, my:2, fontSize: '1rem' }}>
        Add Friend
      </Box>
      <SearchBar />
      <Box component="p" sx={{ px: 2, pt: 2, m: 0, fontSize: '1rem' }}>
        Friend Requests
      </Box>
      <List>
        {attendees.map((attendee) => (
          <ListItem key={attendee.user_id} disablePadding>
            <ListItemButton onClick={onClose}>
              <UsernameAndPFPCard
                username={attendee.username}
                profilePicture={attendee.profile_picture}
                userID={attendee.user_id}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  const tabsData = [
    {
      heading: <ImgIcon src={friendsIconUrl} alt="Add Friend" />, 
      value: AddFriendPanel,
    },
    {
      heading: <ImgIcon src={friendsRequestUrl} alt="Friend Requests" />, 
      value: FriendRequestPanel, 
    },
  ];

  const DrawerList = (
    <Box sx={{ width: "20vw" }} role="presentation">
      <TabsComponent tabValues={tabsData} defaultTab={0} />
    </Box>
  );

  return (
    
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          
          boxSizing: 'border-box',
          color: 'white',

          backgroundColor: 'rgba(20, 22, 38, 0.85)',
          backdropFilter: 'blur(10px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}