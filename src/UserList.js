import React from "react";
import "./App.css";
import { useObserver } from "mobx-react";
import { StoreContext } from "./store/store";

export const UserList = () => {
  const store = React.useContext(StoreContext);
  var userArr;
  return useObserver(() => (
    <div>
      <h2>No. of Users: {store.userList.length} </h2>
      <ul>
        {
          ((userArr = store.userList),
          userArr.map((user) => (
            <li key={user.name}>
              Name: {user.name} &emsp; Age: {user.age} &emsp; Class:{" "}
              {user.class}
            </li>
          )))
        }
      </ul>
    </div>
  ));
};
