import { useRef, useState } from "react";
import "./Auth.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassord, setShowPassword] = useState(false);
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", null);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.status == 200) {
          setJwtToken(res.data.token);
          window.location.href = "/";
          return;
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="login-container">
      <form class="form" onSubmit={handleSubmit}>
        <p class="form-title">Log in to your account</p>
        <div class="input-container">
          <input ref={emailRef} type="email" placeholder="Enter email" />
          <span></span>
        </div>

        <div
          class="input-container"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <input
            style={{ width: "calc(100% - 50px)" }}
            type={showPassord ? "text" : "password"}
            ref={passwordRef}
            placeholder="Enter password"
          />
          <span
            onClick={() => {
              setShowPassword(!showPassord);
            }}
          >
            {showPassord ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="show-hide"
                fill="#064b6b"
                viewBox="0 0 16 16"
              >
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#064b6b"
                className="show-hide"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
              </svg>
            )}
          </span>
        </div>
        <button type="submit" class="submit">
          Log in
        </button>

        <p class="signup-link">
          No account?
          <a href="./register">Sign up</a>
        </p>
      </form>
    </div>
  );
};
export default Login;
