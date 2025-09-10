import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SortByDropdown from "../components/SortByDropdown";
import SearchBar from "../components/SearchBar";
import TagFilterer from "../components/TagFilterer";
import PostCard from "../components/PostCard";
import profilePic from "../assets/images/towelahri.jpg";
import PaginationControls from "../components/PaginationControls";
import React, { useState, useEffect } from "react";

const dummyData = [
  {
    profilePic: profilePic,
    startDate: "06-15",
    usersNeeded: 1,
    usersJoined: 0,
    title: "Casual Duos - Just Vibin'",
    description:
      "Looking to run some casual Duos, no sweat. Just here for good vibes and a few Victory Royales. Mic preferred but not required. NA-E, chill players only",
    tags: ["Mic Required", "18+", "Duos", "ZeroBuild"],
  },
  {
    profilePic: profilePic,
    startDate: "06-18",
    usersNeeded: 2,
    usersJoined: 1,
    title: "Looking for Squad - Ranked Push",
    description:
      "Serious players only! Grinding ranked, need comms and good game sense. Prefer 18+ and must have Discord. EU servers.",
    tags: ["Mic Required", "18+", "Squads", "Ranked"],
  },
  {
    profilePic: profilePic,
    startDate: "06-20",
    usersNeeded: 3,
    usersJoined: 0,
    title: "Zero Build Fun - All Welcome",
    description:
      "Zero Build mode, just for fun! New players welcome, no toxicity. NA-W, let's get some wins and have a laugh.",
    tags: ["ZeroBuild", "Casual", "All Welcome"],
  },
  {
    profilePic: profilePic,
    startDate: "06-22",
    usersNeeded: 1,
    usersJoined: 2,
    title: "Late Night Duos",
    description:
      "Night owls only! Looking for a duo partner to play late nights. Chill vibes, no rage. Prefer 21+.",
    tags: ["Duos", "LateNight", "21+"],
  },
  {
    profilePic: profilePic,
    startDate: "06-25",
    usersNeeded: 2,
    usersJoined: 1,
    title: "Competitive Trio Needed",
    description:
      "Trying to form a competitive trio for upcoming tournaments. Must have experience and be available evenings.",
    tags: ["Trio", "Competitive", "Tournaments"],
  },
  {
    profilePic: profilePic,
    startDate: "06-27",
    usersNeeded: 4,
    usersJoined: 0,
    title: "Beginner Friendly Lobby",
    description:
      "New to the game? Join us! No pressure, just learning and having fun. All ages welcome.",
    tags: ["Beginner", "All Ages", "Learning"],
  },
  {
    profilePic: profilePic,
    startDate: "06-30",
    usersNeeded: 1,
    usersJoined: 3,
    title: "Mic Only - Fast Games",
    description:
      "Quick games, must have a mic and be ready to drop hot. Looking for fast-paced players. NA-E.",
    tags: ["Mic Required", "Fast Games", "NA-E"],
  },
];

const BrowsePostsPage = () => {
  const title = useParams().gameTitle;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const postsPerPage = 4;

  const totalPages = Math.ceil(dummyData.length / postsPerPage);

  useEffect(() => {
    setPageIndex((currentPage - 1) * postsPerPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Fetch new data based on newPage
    }
  };
  const currentPosts = dummyData.slice(pageIndex, pageIndex + postsPerPage);
  return (
    <Container className="browse-posts-container p-5" fluid>
      <Row>
        <Col>
          <h1 style={{ fontSize: "2.8rem", color: "#EDE4F1" }}>{title}</h1>
        </Col>
      </Row>
      <Row className="gx-3 my-4">
        <Col md={5}>
          <TagFilterer />
        </Col>
        <Col md={3}>
          <SortByDropdown />
        </Col>
        <Col md={4}>
          <SearchBar />
        </Col>
      </Row>
      <Row>
          {currentPosts.map((post, index) => (
            <Row key={index}>
              <Col className="my-3">
                <PostCard
                profilePic={post.profilePic}
                startDate={post.startDate}
                usersNeeded={post.usersNeeded}
                usersJoined={post.usersJoined}
                title={post.title}
                description={post.description}
                tags={post.tags}
                />
              </Col>
            </Row>
          ))}
      </Row>
      <Row className="mt-5">
        <Col>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Col>
      </Row>
    </Container>
  );
};

export default BrowsePostsPage;
