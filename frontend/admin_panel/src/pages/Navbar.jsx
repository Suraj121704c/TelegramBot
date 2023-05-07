import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "greenyellow",
            height: "50px",
          }}>
          <Link
            to={"/"}
            style={{
              marginTop: "10px",
              textDecoration: "none",
              fontSize: "20px",
              color: "black",
            }}>
            Admin Panel
          </Link>
        </div>
      </div>
    </>
  );
}
