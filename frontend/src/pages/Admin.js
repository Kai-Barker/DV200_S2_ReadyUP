import "../css/Admin.css";
import CategoryAdmin from "../components/CategoryAdmin";
import dummyImg from "../assets/images/FN PlaceHolder.png";
import { Container, Row, Col } from "react-bootstrap";
import PostAdmin from "../components/ReportedPost";
import AddCategoryInputs from "../components/AddCategoryInputs";
import useAuth from "../customHooks/auth";
import useDebounce from "../customHooks/searchDebounce";
import { useState, useEffect } from "react";
import api from "../api";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";
import PostCard from "../components/PostCardSimple";
import OutlineButton from "../components/OutlineButtonFunction";

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
};

const Admin = () => {
  const { user, isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTermCategories = useDebounce(searchTerm, 500);
  const [categories, setCategories] = useState([]);
  const [postSearchTerm, setPostSearchTerm] = useState("");
  const debouncedSearchTermPosts = useDebounce(postSearchTerm, 500);
  const [postIndex, setPostIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    console.log(user);
    console.log(isLoggedIn);
  }, [user]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const params = new URLSearchParams();
        params.append("limit", 1);
        if (debouncedSearchTermCategories) {
          params.append("search", debouncedSearchTermCategories);
        }
        const response = await api.get(`/lfg?${params.toString()}`);
        const data = await response.data;
        setCategories(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Error fetching categories");
      }
    };
    fetchCategories();
  }, [debouncedSearchTermCategories]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = new URLSearchParams();
        params.append("limit", 1);
        if (debouncedSearchTermPosts) {
          // Assuming you have a post search endpoint like this
          params.append("search", debouncedSearchTermPosts);
        }
        // TODO: Update this URL to your post search/filter endpoint
        const response = await api.get(`/lfg/posts/search/${debouncedSearchTermPosts}`);
        setPosts(response.data);
        setPostIndex(0);
      } catch (error) {
        setError("Error fetching posts");
        console.error("Error fetching posts:", error);
      }
    };

    // Only fetch if there is a search term
    if (debouncedSearchTermPosts) {
      fetchPosts();
    } else {
      setPosts([]); // Clear results if search is empty
    }
  }, [debouncedSearchTermPosts]);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  const OnDeleteCategory = async (category_id) => {
    if (!category_id) {
      console.log("Cannot find related category id");
      return;
    }
    try {
      const response = await api.delete(`/lfg/delete_category/${category_id}`);
      toast.success("Successfully deleted category");
    } catch (error) {
      setError("Error fetching category");
      toast.error("failed to delete category");
    }
  };
  const OnDeletePost = async () => {
    const post_id = posts?.[postIndex]?.post_id;
    if (!post_id) {
      console.log("Cannot find related post id");
      return;
    }
    try {
      const response = await api.delete(`/lfg/delete_post/${post_id}`);
      toast.success("Successfully deleted post");
      setPostSearchTerm("");
    } catch (error) {
      setError("Error fetching post");
      toast.error("failed to delete post");
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="admin-heading" style={{ height: "80vh", fontSize: "5rem" }}>
        <p>Why are you here? ╰（‵□′）╯</p>
      </div>
    );
  }
  return (
    <div className="admin-page">
      <h1 className="admin-heading">Reported Categories</h1>
      <Container fluid className="px-5">
        {/* <Row>

        </Row> */}
        <Row className="gx-5">
          <Col md={3}>
            <SearchBar
              searchValue={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <Row className="gx-5 gy-5 my-1">
              {categories.map((game, index) => (
                <CategoryAdmin
                  image={game?.category_picture}
                  title={game?.title}
                  numPosts={game?.num_posts}
                  onDelete={() => OnDeleteCategory(game.category_id)}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <h1 className="admin-heading">Delete Posts</h1>
      <Container fluid className="px-5">
        {/* <Row>

        </Row> */}
        <Row className="gx-5">
          <Col md={4}>
            <SearchBar searchValue={postSearchTerm} onChange={(e) => setPostSearchTerm(e.target.value)} placeholder="Search posts to delete..." />
            <div style={{ marginTop: "4vh" }}></div>
            <PostCard title={posts[postIndex]?.title} description={posts[postIndex]?.description} />
          </Col>
          <Col md={2}>
            <OutlineButton buttonLabel={"Delete Post"} buttonFunction={OnDeletePost} />
            {posts?.length > 1 ? (
              <Row className="my-4">
                <Col>
                  <OutlineButton buttonLabel={"<"} buttonFunction={() => {
                      if (postIndex - 1 >= 0) {
                        setPostIndex(postIndex - 1);
                      }
                    }} />
                </Col>
                <Col>
                  <OutlineButton
                    buttonLabel={">"}
                    buttonFunction={() => {
                      if (postIndex + 1 <= posts?.length -1) {
                        setPostIndex(postIndex + 1);
                      }
                    }}
                  />
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
      <h1 className="admin-heading">Add A Category</h1>
      <Container fluid className="px-5">
        {/* <Row>

        </Row> */}
        <Row className="gx-5">
          <Col>
            <AddCategoryInputs />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
