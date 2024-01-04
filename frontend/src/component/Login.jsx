import { useRef, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import validator from "validator";
import "../App.css";

export default function Login() {
  const [setUser] = useOutletContext();

  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

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
      setErrorMessage("valid password");
      setIsPasswordError(true);
    } else {
      setErrorMessage("invalid password");
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

  const handleLogin = async () => {
    //e.preventDefault();
    const loginDetail = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetail),
      });
      if (!res.ok) {
        navigate("/signup");
        return;
      }
      const user = await res.json();
      setUser(user);
      sessionStorage.setItem("token", JSON.stringify(user));
      navigate("/");
      console.log("result", user);
    } catch (error) {
      alert(error);
      console.log("error creating", error);
    }
  };

  return (
    <>
      <div className="dialog">
        <form className="form-login">
          <h1 className="h1">Log In</h1>
          <div className="form-label">
            <label htmlFor="email" className="label">
              Email{" "}
            </label>
            <input
              name="email"
              ref={emailRef}
              type="text"
              className="input"
              onChange={(e) => {
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
              name="password"
              ref={passwordRef}
              type="password"
              className="input"
              maxLength={8}
              onChange={(e) => {
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
          <div className="sign-up">
            New to App? <Link to={"/signup"}>Sign up</Link>
          </div>
          <div
            type="submit"
            className="button-login primary-button"
            onClick={() => {
              if (!isEmailError) {
                alert(`Invalid ${errorEmail}`);
              } else if (!isPasswordError) {
                alert(`${errorMessage}`);
              } else {
                handleLogin();
              }
            }}
          >
            Log In
          </div>
        </form>
      </div>
    </>
  );
}
