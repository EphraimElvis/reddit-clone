import { useRef, useEffect, useState } from "react";

//Priority
//using form data contructor
//send form data object not json

export const CreatePost = () => {
  const [postImage, setPostImage] = useState();
  const [user, setUser] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMzE1NjcyNywiZXhwIjoxNzAzMjQzMTI3fQ.bShzsnaw-YNsVLEMGDQKwygIHUbhJSBCJBe272_6MsQ"
  );
  const titleRef = useRef();
  const fileRef = useRef();
  const refForm = useRef();
  const refButton = useRef();
  const descriptionRef = useRef();

  useEffect(() => {});

  const handleUserPost = (e) => {
    e.preventDefault();
    const userPost = {
      text: titleRef.current.value,
      image: postImage,
      description: descriptionRef.current.value,
    };
    const formData = new FormData();
    formData.append("image", userPost.image);
    formData.append("text", userPost.text);
    formData.append("description", userPost.description);
    //const userFormData = Object.fromEntries(formData);
    console.log("user data", Object.fromEntries(formData));

    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Request failed!");
      })
      .then((data) => {
        console.log("data ", data);
      })
      .catch((er) => console.log("error", er));
  };

  return (
    <div className="create-post-container">
      <form className="form" onSubmit={handleUserPost} ref={refForm}>
        <input
          type="text"
          className="text-input-title"
          placeholder="Post title"
          ref={titleRef}
        />
        <div className="input-container">
          <label htmlFor="image_uploads">
            Choose images to upload (PNG, JPG)
          </label>
          <input
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
            multiple
            ref={fileRef}
            onChange={(event) => {
              const fileList = event.target.files[0];
              //setPostImage(fileList);
              setPostImage(URL.createObjectURL(fileList));
              //console.log(fileList);
            }}
          />
        </div>
        <textarea
          className="textarea-description"
          placeholder="Post description"
          ref={descriptionRef}
        />
        <input
          type="submit"
          value={"Post"}
          className="post-btn"
          ref={refButton}
        />
      </form>
    </div>
  );
};

//when user has logged in
//create a form to create a post
