import PropTypes from "prop-types";
export const CreatePost = (props) => {
  const handleUserPost = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      body: new FormData(e.target),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Request failed!");
      })
      .then((data) => {
        props.createPost([data, ...props.posts]);
        console.log("data ", data);
      })
      .catch((er) => console.log("error", er));
  };

  return (
    <div className="create-post-container">
      <form className="form" onSubmit={handleUserPost}>
        <input
          type="text"
          className="text-input-title"
          placeholder="Post title"
          name="text"
        />
        <div className="input-container">
          <label htmlFor="image_uploads">
            Choose images to upload (PNG, JPG)
          </label>
          <input
            type="file"
            id="image_uploads"
            name="image"
            accept=".jpg, .jpeg, .png"
            multiple
          />
        </div>
        <textarea
          className="textarea-description"
          placeholder="Post description"
          name="description"
        />
        <input type="submit" value={"Post"} className="post-btn" />
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  token: PropTypes.string,
  createPost: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
};
