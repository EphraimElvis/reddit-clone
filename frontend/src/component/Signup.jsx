import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

export const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const firstnameRef = useRef("");
  const lastnameRef = useRef("");

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("strong password");
      setIsPasswordError(true);
    } else {
      setErrorMessage("Is not a strong password");
      setIsPasswordError(false);
    }
  };

  const validateEmail = (value) => {
    if (!validator.isEmail(value)) {
      setErrorEmail("Invalid emaill address");
      setIsEmailError(false);
    } else {
      setErrorEmail("Valid emaill address");
      setIsEmailError(true);
    }
  };

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
          navigate("/login");
          return;
        }
        throw new Error("Request failed!");
      })
      .then(() => {})
      .catch((er) => console.log("error", er));
  };

  return (
    <section className="wrapper">
      <div className="dialog">
        <form className="form-login">
          <h1 className="h1">Sign Up</h1>
          <div className="form-label">
            <label htmlFor="email" className="label">
              Email{" "}
            </label>
            <input
              ref={emailRef}
              name="email"
              type="text"
              className="input"
              onChange={(e) => {
                e.preventDefault();
                let emailValue = e.target.value;
                validateEmail(emailValue);
              }}
            />
            {!isEmailError ? (
              <span
                style={{
                  fontWeight: "bold",
                  color: "red",
                  paddingTop: ".5rem",
                }}
              >
                {errorEmail}
              </span>
            ) : (
              <span
                style={{
                  fontWeight: "bold",
                  color: "green",
                  paddingTop: ".5rem",
                }}
              >
                {errorEmail}
              </span>
            )}
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
              maxLength={8}
              onChange={(e) => {
                e.preventDefault();
                validate(e.target.value);
              }}
            />
            {!isPasswordError ? (
              <span
                style={{
                  fontWeight: "bold",
                  color: "red",
                  paddingTop: ".5rem",
                }}
              >
                {errorMessage}
              </span>
            ) : (
              <span
                style={{
                  fontWeight: "bold",
                  color: "green",
                  paddingTop: ".5rem",
                }}
              >
                {errorMessage}
              </span>
            )}
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
          <div className="sign-up">
            Existing user? <Link to={"/login"}>Sign in</Link>
          </div>
          <div
            className="button-login primary-button"
            onClick={() => {
              if (!isEmailError) {
                alert(`Invalid ${errorEmail}`);
              } else if (!isPasswordError) {
                alert(`${errorMessage}`);
              } else {
                alert("Account created successfully");
                handleCreateUser();
              }
            }}
          >
            Sign Up
          </div>
        </form>
      </div>
    </section>
  );
};
