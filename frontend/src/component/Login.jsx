import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [setUser] = useOutletContext();

  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async (e) => {
    e.preventDefault();
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
      console.log("error creating", error);
    }
  };

  return (
    <section>
      <dialog className="dialog" open>
        {/* <span
          className="material-symbols-outlined close-button"
         
        >
          close
        </span> */}

        <form className="form-login">
          <h1 className="h1">Log In</h1>
          <div className="form-label">
            <label htmlFor="email" className="label">
              Email{" "}
            </label>
            <input name="email" ref={emailRef} type="text" className="input" />
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
            />
          </div>
          <div className="sign-up">New to App? Sign Up</div>
          <div
            type="submit"
            className="button-login primary-button"
            onClick={handleLogin}
          >
            Log In
          </div>
        </form>
      </dialog>
    </section>
  );
}
