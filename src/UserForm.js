import React from "react";
import { API_URL } from "./config.js";

export const UserForm = () => {
  const [user, setUser] = React.useState({
    name: "",
    age: "",
    class: "",
  });
  const updateUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const updateUserAge = (e) => {
    setUser({
      ...user,
      [e.target.name]: parseInt(e.target.value),
    });
  };
  function addUser() {
    fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ user: user }),
    }).then(function (response) {
      if (!response.ok) {
        alert("Failed to add user !!");
        throw new Error("Failed to add user - ", response);
      }
    });
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (localStorage.getItem("token") !== "") {
            if (user.name === "" || user.age === "" || user.class === "") {
              alert("Empty field..!! ");
            } else if (!/^[a-zA-Z]+$/.test(user.name)) {
              alert("Invalid name.");
            } else if (isNaN(user.age)) {
              alert("Age is not a number.");
            } else {
              addUser();
              setUser({ id: "", name: "", age: "", class: "" });
            }
          } else {
            alert("Please login first...!!");
          }
        }}
      >
        <h3>Insert Data </h3>
        <label>
          Name: &emsp;
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={updateUser}
          />
        </label>
        <br />
        <br />
        <label>
          Age: &emsp;
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={updateUserAge}
          />
          <br />
          <br />
        </label>{" "}
        <div
          onChange={(e) => {
            if (e.target.value !== "") {
              updateUser(e);
            }
          }}
        >
          Class: &emsp;
          <input type="radio" name="class" value="FY" /> FY
          <input type="radio" name="class" value="SY" /> SY
          <input type="radio" name="class" value="TY" /> TY
        </div>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
