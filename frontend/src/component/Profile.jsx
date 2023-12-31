import { useEffect, useState } from "react";

//import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState("");
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const user = sessionStorage.getItem("token");

    setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await res.json();
        setUserProfile(json.data);
        return json;
      } catch (error) {
        console.log("error creating", error);
      }
    };
    if (user) {
      fetchAllPost();
    }
  }, [user]);

  const handleDeleteUserProfile = () => {
    const fetchAllPost = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        //const json = await res.json();
        if (res.ok) {
          sessionStorage.clear();
          window.location.href = "/signup";
        }
      } catch (error) {
        console.log("error creating", error);
      }
    };
    if (user) {
      fetchAllPost();
    }
  };

  //return <>{<>hello{userProfile.firstName}</>}</>;
  return (
    <div className="wrapper">
      <div className="profile-main-container">
        <div className="profile-container">
          <div className="user-profile-image">
            <span className="material-symbols-outlined profile-size">
              account_circle
            </span>
            <div className="welcome">Welcome {userProfile.firstName}</div>
          </div>
          <div className="profile-body">
            <div className="user-name">
              <h2 className="label-name">Email </h2>
              <div className="label-value">{userProfile.email}</div>
            </div>
            <div className="user-name">
              <h2 className="label-name">First Name </h2>
              <div className="label-value">{userProfile.firstName}</div>
            </div>

            <div className="user-name">
              <h2 className="label-name">Last Name </h2>
              <div className="label-value">{userProfile.lastName}</div>
            </div>
            <div className="user-name">
              <h2 className="label-name">Password </h2>
              <div className="label-value">{userProfile.password}</div>
            </div>
          </div>
          |
          <div className="delete-account">
            <button onClick={handleDeleteUserProfile}>Delete Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
