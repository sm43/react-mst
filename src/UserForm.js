import React from "react";
import "./App.css";
import { StoreContext } from "./store/store";

export const UserForm = () => {
  const store = React.useContext(StoreContext);
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

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (user.name === "" || user.age === "" || user.class === "") {
            alert("Empty field..!! ", user.age);
          } else if (!/^[a-zA-Z]+$/.test(user.name)) {
            alert("Invalid name.");
          } else if (isNaN(user.age)) {
            alert("Age is not a number.");
          } else {
            store.add(user);
            setUser({ name: "", age: "", class: "" });
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
