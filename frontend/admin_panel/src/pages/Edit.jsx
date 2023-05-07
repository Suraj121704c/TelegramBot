import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "./Navbar";

const Edit = () => {
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");
  let params = useParams();

  const handleData = () => {
    axios
      .get(`https://odd-lime-lemming-ring.cyclic.app/users/${params.id}`)
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    handleData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name,
      city,
      country,
    };
    axios
      .patch(`https://odd-lime-lemming-ring.cyclic.app/users/update/${params.id}`, userDetails)
      .then((res) => {
        console.log(res.data);
        {
          alert(`data has been updated... thansk for updating data!!!`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Nav />
      <h1>You can Edit Here...</h1>

      <form onSubmit={handleSubmit}>
        <h3>id : {data._id}</h3>
        <input
          type="text"
          name="name"
          value={name}
          placeholder={data.name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          name="city"
          value={city}
          placeholder={data.city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          name="country"
          value={country}
          placeholder={data.country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Edited</button>
      </form>
    </div>
  );
};

export default Edit;
