import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Post = ({ userId, postId, description, imageUrl, text, token }) => {
  const [hasRead, setHasRead] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts/" + postId + "/" + userId, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHasRead(data.hasRead);
      })
      .catch((err) => console.log(err));
  }, [postId, token, userId]);

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
  );
};

export default Post;

Post.propTypes = {
  userId: PropTypes.number,
  postId: PropTypes.number,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  token: PropTypes.string,
};
