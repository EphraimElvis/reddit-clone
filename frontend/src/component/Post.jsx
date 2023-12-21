import { useEffect, useState } from "react";

const Post = ({ userId, postId, description, imageUrl, text }) => {
  const [hasRead, setHasRead] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("token"));
    fetch("http://localhost:3000/api/posts/" + postId + "/" + userId, {
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    })
      .then((response) => {
        // if (response.ok) {
        response.json();
        // }
      })
      .then((data) => {
        setHasRead(data.hasRead);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRead = () => {
    const user = JSON.parse(sessionStorage.getItem("token"));

    if (!hasRead) {
      fetch("http://localhost:3000/api/posts/" + postId + "/" + userId, {
        method: "POST",
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      }).then((res) => {
        if (res.ok) {
          setHasRead(true);
        }
      });
    }
  };
  return (
    <div className="post">
      <h2 className="post-title">{text}</h2>
      <img src={imageUrl} className="post-img" />
      <p className="post-title">{description}</p>
      <div className="read-post-container">
        {hasRead ? (
          <span className="material-symbols-outlined read">
            mark_email_read
          </span>
        ) : (
          <button
            className="material-symbols-outlined unread"
            onClick={handleRead}
          >
            mark_as_unread
          </button>
        )}
      </div>
    </div>

    //   <button disabled={!hasRead} onClick={handleRead}>
    //     {hasRead && "Read"}
    //   </button>
    // </div>
  );
};

export default Post;

//create post component that displays post
//pass the post id, user_id,
//inside the post, check if user has read post using useefect
