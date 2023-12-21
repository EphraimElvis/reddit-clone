import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { CreatePost } from "./component/CreatePost";
import Post from "./component/Post";

//create post component that displays post
//pass the post id, user_id,
//inside the post, check if user has read post using useefect

//when user has logged in
//create a form to create a post

//styling the page

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [showPostForm, setShowPostForm] = useState(false);
  const navigate = useNavigate();

  const handleShowForm = (e) => {
    e.preventDefault();
    if (!showPostForm) {
      setShowPostForm(true);
    } else {
      setShowPostForm(false);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("token");
    //validate token from backend to check if token has not expired
    if (user) {
      setUser(JSON.parse(user));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        //const beareaToken = sessionStorage.getItem("token");
        //console.log("bearer tpken", beareaToken);
        const res = await fetch("http://localhost:3000/api/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await res.json();
        console.log("", json);
        setPosts(json);
        return json;
      } catch (error) {
        console.log("error creating", error);
      }
    };
    if (user) {
      fetchAllPost();
    }

    //console.log("all post", data);
  }, [user]);

  return (
    <div className="wrapper">
      <header className="header">
        <button className="create-post-btn" onClick={handleShowForm}>
          <span className="material-symbols-outlined">add</span>Create Post
        </button>
        <h1 className="post-header">Welcome</h1>
      </header>
      <main>{showPostForm ? <CreatePost user={user} /> : null}</main>
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
              />
            )
          /* <div className="post" key={post.id}>
            <h2 className="post-title">{post.text}</h2>
            <img src={post.imageUrl} className="post-img" />
            <p className="post-title">{post.description}</p>
            <div className="read-post-container">
              {true ? (
                <span className="material-symbols-outlined read">
                  mark_email_read
                </span>
              ) : (
                <span className="material-symbols-outlined unread">
                  mark_as_unread
                </span>
              )}
            </div>
          </div> */
        )}
      <Outlet context={[setUser]} />
    </div>
  );
}

export default App;
