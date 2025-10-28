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
import useDebounce from "../customHooks/searchDebounce";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";

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

const ImgIcon = ({ src, alt }) => <img src={src} alt={alt} style={{ height: "40px", width: "40px" }} />;

export default function FriendsList({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const RemoveFriend = async (userID) => {
    console.log(`Removing friend ${userID}`);
    if (!userID) {
      return;
    }
    try {
      const response = await api.delete(`user/friend/remove/${userID}`);
      toast.success("Friend removed successfully!");
      ReactGA.event({
        action: "remove_friend",
      });
      fetchAllFriends();
    } catch (error) {
      toast.error("Unable to remove friend");
    }
  };

  const AcceptFriendRequest = (userID) => {
    console.log(`Accepting request from ${userID}`);

    const acceptFriend = async () => {
      if (!userID) {
        return;
      }
      try {
        const response = await api.post(`user/accept_friend_request/${userID}`);
        console.log("Accepted friend request" + response.data.message);
        ReactGA.event({
          action: "accept_friend_request",
        });
        fetchAllFriends();
      } catch (error) {
        console.error("Error adding friend", error);
      }
    };
    acceptFriend();
  };
  const AddFriend = async (userID) => {
    console.log(`Adding friend ${userID}`);
    if (!userID) {
      return;
    }
    try {
      const response = await api.post(`user/send_friend_request/${userID}`);
      console.log("Friend request sent: " + response.data.message);
      ReactGA.event({
        action: "send_friend_request",
      });
      toast.success("Friend request sent!");
    } catch (error) {
      console.error("Failed to add friend", error);
      toast.error("Unable to send friend request");
    }
  };

  const fetchAllFriends = async () => {
    try {
      const response = await api.get("user/friends");
      setFriends(response.data.data);
      console.log(response.data.data);
      const requestsResponse = await api.get("user/friends/requests");
      console.log(requestsResponse.data.data);
      setFriendRequests(requestsResponse.data.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };
  useEffect(() => {
    fetchAllFriends();
  }, []);
  useEffect(() => {
    const search = async () => {
      if (debouncedSearchTerm) {
        try {
          const response = await api.get(`/user/search/${debouncedSearchTerm}`);
          setSearchResults(response.data.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      }
    };
    search();
  }, [debouncedSearchTerm]);
  const FriendPanel = (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <List>
        {friends?.map((attendee) => (
          <ListItem key={attendee.user_id} disablePadding>
            <ListItemButton onClick={onClose}>
              <UsernameAndPFPCard
                username={attendee.username}
                profilePicture={attendee.profile_picture}
                userID={attendee.user_id}
                isRemove={true}
                onRemoveFunction={RemoveFriend}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const FriendRequestPanel = (
    <Box>
      <Box component="p" sx={{ px: 2, pt: 2, m: 0, my: 2, fontSize: "1rem" }}>
        Add Friend
      </Box>
      <SearchBar searchValue={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <List className="my-5">
        {searchResults?.map((attendee) => (
          <ListItem key={attendee.user_id} disablePadding>
            <ListItemButton onClick={onClose}>
              <UsernameAndPFPCard
                username={attendee.username}
                profilePicture={attendee.profile_picture}
                userID={attendee.user_id}
                isAdd={true}
                onAddFunction={AddFriend}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box component="p" sx={{ px: 2, pt: 2, m: 0, fontSize: "1rem" }}>
        Friend Requests
      </Box>
      <List>
        {friendRequests?.map((attendee) => (
          <ListItem key={attendee.user_id} disablePadding>
            <ListItemButton onClick={onClose}>
              <UsernameAndPFPCard
                username={attendee.username}
                profilePicture={attendee.profile_picture}
                userID={attendee.user_id}
                isAdd={true}
                isRemove={true}
                onAddFunction={AcceptFriendRequest}
                onRemoveFunction={RemoveFriend}
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
      value: FriendPanel,
    },
    {
      heading: <ImgIcon src={friendsRequestUrl} alt="Friend Requests" />,
      value: FriendRequestPanel,
    },
  ];

  const DrawerList = (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
      }}
      role="presentation"
    >
      <TabsComponent tabValues={tabsData} defaultTab={0} />
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "40vh",
          boxSizing: "border-box",
          color: "white",

          backgroundColor: "rgba(20, 22, 38, 0.85)",
          backdropFilter: "blur(10px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}
