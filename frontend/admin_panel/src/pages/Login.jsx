import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Nav from "./Navbar";

const Login = () => {
  const { login, isAuth } = useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const userDetails = {
      email,
      password,
    };
    if (userDetails.email === "admin@123" && userDetails.password === "admin") {
      alert(`Login Successfull...`);
      login();
    } else {
      alert(`Login Failed!!! Try Agin...`);
    }
  };

  if (isAuth) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <div>
      <Nav />
      <h1>Login Page</h1>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-evenly",
        }}>
        <form
          onSubmit={handleLogin}
          style={{
            boxShadow:
              "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px",
            width: "400px",
            height: "150px",
          }}>
          <label>
            <input
              type="text"
              placeholder="email..."
              value={email}
              style={{ marginTop: "20px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            <input
              type="password"
              placeholder="pass..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
