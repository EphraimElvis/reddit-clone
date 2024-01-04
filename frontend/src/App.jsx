import { useEffect, useState } from "react";
import logo from "../src/assets/icon-above-font.png";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { CreatePost } from "./component/CreatePost";
import Post from "./component/Post";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [showPostForm, setShowPostForm] = useState(false);
  const navigate = useNavigate();

  const handleShowForm = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please Signin to create a post!");
      return;
    }
    if (!showPostForm) {
      setShowPostForm(true);
    } else {
      setShowPostForm(false);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("token");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      if (
        window.location.pathname !== "/signup" &&
        window.location.pathname !== "/login"
      ) {
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await res.json();
        setPosts(json);
        return json;
      } catch (error) {
        console.log("error creating", error);
      }
    };
    if (user) {
      fetchAllPost();
    }
  }, [user]);

  return (
    <div className="wrapper">
      <header className="header">
        <button className="create-post-btn" onClick={handleShowForm}>
          <span className="material-symbols-outlined">add</span>Create a post
        </button>
        <h1 className="post-header">
          <img src={logo} />
        </h1>
        <div
          className="user-profile-header"
          onClick={() => {
            if (!user) {
              alert("Please Signin to create account");
            } else {
              navigate("/profile");
            }
          }}
        >
          <span className="material-symbols-outlined profile-size">
            account_circle
          </span>
          <h5 className="view-profile">View Profile</h5>
        </div>
      </header>
      <main className="main">
        {showPostForm ? (
          <CreatePost
            token={user.token}
            createPost={setPosts}
            posts={posts}
            // user={user}
          />
        ) : null}

        {user &&
          posts.map(
            (post) =>
              true && (
                <Post
                  userId={user.userId}
                  postId={post.id}
                  key={post.id}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  text={post.text}
                  token={user.token}
                  userPostId={post.userId}
                />
              )
          )}
        <Outlet context={[setUser]} />
      </main>
    </div>
  );
}

export default App;
