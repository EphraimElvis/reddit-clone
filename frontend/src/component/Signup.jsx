import { useRef } from "react";

export const Signup = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const firstnameRef = useRef("");
  const lastnameRef = useRef("");

  const handleCreateUser = async () => {
    const userDetails = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstnameRef.current.value,
      lastName: lastnameRef.current.value,
    };

    fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Request failed!");
      })
      .then((data) => {
        const userData = JSON.parse(data);
        sessionStorage.setItem("userData", userData);
      })
      .catch((er) => console.log("error", er));
  };

  return (
    <section className="wrapper">
      <dialog className="dialog" open>
        <span className="material-symbols-outlined close-button">close</span>

        <form className="form-login">
          <h1 className="h1">Sign Up</h1>
          <div className="form-label">
            <label htmlFor="email" className="label">
              Email{" "}
            </label>
            <input ref={emailRef} name="email" type="text" className="input" />
          </div>
          <div className="form-label">
            <label htmlFor="password" className="label">
              Password{" "}
            </label>
            <input
              ref={passwordRef}
              name="password"
              type="password"
              className="input"
              maxLength={10}
            />
          </div>
          <div className="form-label">
            <label htmlFor="firstname" className="label">
              First Name{" "}
            </label>
            <input
              ref={firstnameRef}
              name="firstname"
              type="text"
              className="input"
            />
          </div>
          <div className="form-label">
            <label htmlFor="lastname" className="label">
              Last Name{" "}
            </label>
            <input
              ref={lastnameRef}
              name="lastname"
              type="text"
              className="input"
            />
          </div>
          <div className="sign-up">New to App? Sign Up</div>
          <div
            className="button-login primary-button"
            onClick={handleCreateUser}
          >
            Sign Up
          </div>
        </form>
      </dialog>
    </section>
  );
};
