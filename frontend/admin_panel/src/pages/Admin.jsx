import React, { useContext, useEffect, useState } from "react";
import Nav from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Admin = () => {
  const [q, setq] = useState("");
  const [data, setData] = useState([]);
  const { logout } = useContext(AuthContext);

  const hadleSearch = (q) => {
    axios
      .get(`https://odd-lime-lemming-ring.cyclic.app/users?name=${q}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    hadleSearch(q);
  }, [q]);

  const handleDelte = (id) => {
    axios
      .delete(`https://odd-lime-lemming-ring.cyclic.app/users/delete/${id}`)
      .then((res) => {
        console.log(res);
        hadleSearch(q);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "30px",
        }}>
        <div>
          {" "}
          <input
            type="text"
            placeholder="search-users-here"
            value={q}
            onChange={(e) => setq(e.target.value)}
            color="green"
          />
        </div>

        <div>
          <button onClick={handleLogOut} style={{ color: "red" }}>
            LogOut
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}>
        {data.length === 0 ? (
          <h1>Please wait...</h1>
        ) : (
          data.map((item) => (
            <div
              style={{
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
                  borderRadius : "20px"
              }}
              key={item._id}>
              <h1>Name : {item.name}</h1>
              <h1>City : {item.city}</h1>
              <h1>Country : {item.country}</h1>
              <button
                onClick={() => {
                  handleDelte(item._id);
                }}
                style={{ color: "red" }}>
                Delete
              </button>
              &nbsp;&nbsp;&nbsp;
              <button>
                {" "}
                <Link
                  to={`/users/${item._id}`}
                  style={{ textDecoration: "none", color: "green" }}>
                  Edit
                </Link>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
