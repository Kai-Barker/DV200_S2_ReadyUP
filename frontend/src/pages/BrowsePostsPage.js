import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SortByDropdown from "../components/SortByDropdown";
import SearchBar from "../components/SearchBar";
import TagFilterer from "../components/TagFilterer";
import PostCard from "../components/PostCard";
import profilePic from "../assets/images/BasePFP.png";
import PaginationControls from "../components/PaginationControls";
import { useState, useEffect } from "react";
import PostCardWithAttendees from "../components/PostCardWithAttendees";
import CreatePost from "../components/CreatePost";
import OutlineButton from "../components/OutlineButtonFunction";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "../customHooks/auth";
import api from "../api";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";
import useDebounce from "../customHooks/searchDebounce";
import useSeoPageInfo from "../customHooks/useSeoPageInfo";

const dummyData = [
  {
    profile_picture: profilePic,
    start_time: "06-15",
    usersNeeded: 1,
    usersJoined: 0,
    title: "Casual Duos - Just Vibin'",
    description:
      "Looking to run some casual Duos, no sweat. Just here for good vibes and a few Victory Royales. Mic preferred but not required. NA-E, chill players only",
    tags: ["Mic Required", "18+", "Duos", "ZeroBuild"],
  },
  {
    profile_picture: profilePic,
    start_time: "06-18",
    usersNeeded: 2,
    usersJoined: 1,
    title: "Looking for Squad - Ranked Push",
    description: "Serious players only! Grinding ranked, need comms and good game sense. Prefer 18+ and must have Discord. EU servers.",
    tags: ["Mic Required", "18+", "Squads", "Ranked"],
  },
  {
    profile_picture: profilePic,
    start_time: "06-20",
    usersNeeded: 3,
    usersJoined: 0,
    title: "Zero Build Fun - All Welcome",
    description: "Zero Build mode, just for fun! New players welcome, no toxicity. NA-W, let's get some wins and have a laugh.",
    tags: ["ZeroBuild", "Casual", "All Welcome"],
  },
  {
    profile_picture: profilePic,
    start_time: "06-22",
    usersNeeded: 1,
    usersJoined: 2,
    title: "Late Night Duos",
    description: "Night owls only! Looking for a duo partner to play late nights. Chill vibes, no rage. Prefer 21+.",
    tags: ["Duos", "LateNight", "21+"],
  },
  {
    profile_picture: profilePic,
    start_time: "06-25",
    usersNeeded: 2,
    usersJoined: 1,
    title: "Competitive Trio Needed",
    description: "Trying to form a competitive trio for upcoming tournaments. Must have experience and be available evenings.",
    tags: ["Trio", "Competitive", "Tournaments"],
  },
  {
    profile_picture: profilePic,
    start_time: "06-27",
    usersNeeded: 4,
    usersJoined: 0,
    title: "Beginner Friendly Lobby",
    description: "New to the game? Join us! No pressure, just learning and having fun. All ages welcome.",
    tags: ["Beginner", "All Ages", "Learning"],
  },
  {
    profile_picture: profilePic,
    start_time: "06-30",
    usersNeeded: 1,
    usersJoined: 3,
    title: "Mic Only - Fast Games",
    description: "Quick games, must have a mic and be ready to drop hot. Looking for fast-paced players. NA-E.",
    tags: ["Mic Required", "Fast Games", "NA-E"],
  },
];

const sortOptions = ["Newest", "Oldest", "Needs Players"];

const BrowsePostsPage = () => {

  

  const title = useParams().gameTitle;
  const [currentPage, setCurrentPage] = useState(1);
  // const [pageIndex, setPageIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTags, setCurrentTags] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentAttendees, setCurrentAttendees] = useState([]);

  const { user, isLoggedIn } = useAuth();
  useEffect(() => {
    console.log(user);
    console.log(isLoggedIn);
    
  }, [user]);

  const [open, setOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedTags, setSelectedTags] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const postsPerPage = 8;

  useSeoPageInfo({
    title:`Find ${title} Groups (LFG) | ReadyUP`,
    description:`Find active LFG posts for ${title}. Join groups and find teammates to play ${title} today.`
});

  const handlePostJoin = async () => {
    if (currentPost.max_players - currentPost.num_joined <= 0) {
      toast.error("Post is unfortunately full");
      return;
    }

    if (currentPost.user_id == user.id) {
      toast.error("You cant join your own post, silly");
      handleClose();
      return;
    }
    const joinData = {
      postID: currentPost.post_id,
      poster_id: currentPost.user_id,
    };
    if (!joinData.postID) {
      console.error("Error Joining Post");
      return;
    }
    try {
      const response = await api.post(`/lfg/posts/join`, joinData);
      console.log("Successfully joined post" + response.data);
      toast.success("Post joined successfully!");
      ReactGA.event("join_post");
      handleClose();
      fetchPosts();
    } catch (error) {
      console.error("failed to join post" + error);
      toast.error("Failed to join post");
    }
  };

  const fetchPostGroup = async (postID) => {
    console.log("Fetching attendees");

    try {
      const response = await api.get(`/lfg/${postID}/joined-users`);
      console.log("Attendees:");
      console.log(response.data);
      setCurrentAttendees(response.data);
    } catch (error) {
      console.error("Failed to join post" + error);
    }
  };

  const handleClickOpen = async (postData = null) => {
    //Doesnt work if i do postData != null for some odd fuckass reason
    setCurrentAttendees([]);
    if (postData !== null) {
      setCurrentPost(postData);
      setOpen(true);
      fetchPostGroup(postData.post_id);
    } else {
      setCurrentPost(null);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setCurrentPost(null);
    setOpen(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [title, currentPage, debouncedSearchTerm, sortBy, selectedTags]);

  // const totalPages = Math.ceil(posts.length / postsPerPage);

  // useEffect(() => {
  //   setPageIndex((currentPage - 1) * postsPerPage);
  // }, [currentPage]);

  const fetchPosts = async () => {
    setIsLoading(true);
    let apiSortValue;
    switch (sortBy) {
      case "Oldest":
        apiSortValue = "start_time_asc";
        break;
      case "Needs Players":
        apiSortValue = "needs_players_desc";
        break;
      default: //newest
        apiSortValue = "start_time_desc";
        break;
    }
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", postsPerPage);
      params.append("sort", apiSortValue);

      if (debouncedSearchTerm) {
        params.append("search", debouncedSearchTerm);
      }

      if (selectedTags.length > 0) {
        params.append("tags", selectedTags.join(","));
      }
      const response = await api.get(`/lfg/${title}/posts?${params.toString()}`);
      const data = await response.data;
      console.log(data);
      //Make new object with tags as an array rather than string
      const dataWithTags = data.data.map((post) => {
        return {
          post_id: post.post_id,
          description: post.description,
          category_id: post.category_id,
          title: post.title,
          expiry_time: post.expiry_time,
          start_time: post.start_time,
          max_players: post.max_players,
          num_joined: post.num_joined,
          user_id: post.user_id,
          profile_picture: post.profile_picture,
          tags: post.tags ? post.tags.split(",") : [],
        };
      });
      setPosts(dataWithTags);
      setTotalPages(Math.ceil(data.totalItems / postsPerPage));
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching posts");
      setIsLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await api.get(`/lfg/${title}/tags`);
      const data = response.data;
      console.log(data);
      setCurrentTags(data);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching tags");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // fetchPosts();
    fetchTags();
  }, [title]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Fetch new data based on newPage
    }
  };
  // const currentPosts = posts.slice(pageIndex, pageIndex + postsPerPage);
  return (
    <>
      <Container className="browse-posts-container p-5" fluid>
        <Row>
          <Col md={6}>
            <h1 style={{ fontSize: "2.8rem", color: "#EDE4F1" }}>{title}</h1>
          </Col>
          {isLoggedIn && (
            <Col md={{ span: 2, offset: 4 }}>
              <OutlineButton buttonLabel={"Create Post"} buttonFunction={() => handleClickOpen(null)} />
            </Col>
          )}
        </Row>
        <Row className="gx-3 my-4">
          <Col md={5}>
            <TagFilterer
              currentTags={currentTags}
              selected={selectedTags}
              onChange={(newTags) => {
                setSelectedTags(newTags);
                setCurrentPage(1); // Reset page on filter
              }}
            />
          </Col>
          <Col md={3}>
            <SortByDropdown
              label={"Sort By"}
              options={sortOptions}
              setFunction={(newValue) => {
                setSortBy(newValue);
                setCurrentPage(1); // Reset to page 1 on sort to avoid going over the limit of available categories when filtering
              }}
              value={sortBy}
            />
          </Col>
          <Col md={3}>
            <SearchBar
              searchValue={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search for same reason as dropdown
              }}
            />
          </Col>
          {/* <Col md={2}>
          <OutlineButton buttonLabel={"Create Post"} buttonFunction={() => {}} />
        </Col> */}
        </Row>
        <Row>
          {posts.map((post, index) => (
            <Row key={post.post_id}>
              <Col className="my-3">
                <PostCard
                  profilePic={post.profile_picture || profilePic}
                  startDate={post.start_time}
                  usersNeeded={post.max_players - post.num_joined}
                  usersJoined={post.num_joined}
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  post={post}
                  onCardClick={() => handleClickOpen(post)}
                />
              </Col>
            </Row>
          ))}
        </Row>
        <Row className="mt-5">
          <Col>
            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </Col>
        </Row>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: "#171123",
            border: "2px solid #EDE4F1",
            borderRadius: "40px",
            color: "#EDE4F1",
          },
        }}
      >
        {" "}
        {currentPost ? (
          <>
            <DialogTitle sx={{ fontFamily: "Audiowide, sans-serif", borderBottom: "1px solid #EDE4F1", color: "#73EEDC" }}>
              Join Post {currentPost.title}?
            </DialogTitle>
            <DialogContent sx={{ paddingTop: "2rem !important" }}>
              <h3 style={{ marginBottom: "5vh" }}>Would you like to join this post?</h3>
              <PostCardWithAttendees
                profilePic={currentPost.profile_picture || profilePic}
                startDate={currentPost.start_time}
                usersNeeded={currentPost.max_players - currentPost.num_joined}
                usersJoined={currentPost.num_joined}
                attendees={currentAttendees}
              />
              <Row style={{ marginTop: "3vh" }}>
                <Col md={2} style={{ width: "auto" }}>
                  <OutlineButton buttonLabel={"Join Post"} buttonFunction={handlePostJoin} />
                </Col>
              </Row>
            </DialogContent>
            <DialogActions sx={{ borderTop: "1px solid #EDE4F1" }}>
              <Button
                onClick={handleClose}
                className="cursor-target"
                sx={{ color: "#73EEDC", fontFamily: "Audiowide, sans-serif", fontSize: "20px", marginRight: "3vh" }}
              >
                Cancel
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle sx={{ fontFamily: "Audiowide, sans-serif", borderBottom: "1px solid #EDE4F1" }}>Create Post</DialogTitle>
            <DialogContent sx={{ paddingTop: "2rem !important" }}>
              <CreatePost refresh={fetchPosts} setOpen={setOpen} currentTags={currentTags} />
            </DialogContent>
            <DialogActions sx={{ borderTop: "1px solid #EDE4F1" }}>
              <Button
                onClick={handleClose}
                className="cursor-target"
                sx={{ color: "#73EEDC", fontFamily: "Audiowide, sans-serif", fontSize: "20px", marginRight: "3vh" }}
              >
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default BrowsePostsPage;
