import React from "react";
import "./App.css";
import { useObserver } from "mobx-react";
import { StoreContext } from "./store/store";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   sortable,
// } from "@patternfly/react-table";

export const UserList = () => {
  const store = React.useContext(StoreContext);
  var userArr;
  // var rows = [];
  // var columns = [
  //   { title: "Name", transforms: [sortable] },
  //   { title: "Age", transforms: [sortable] },
  //   { title: "Class" },
  // ];
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

      {/* {
        ((userArr = store.userList),
        userArr.map((user) =>
          rows.push({ cells: [user.name, user.age, user.class] })
        ))
      }
      <Table
        aria-label="Sortable Table"
        caption="Users"
        cells={columns}
        rows={rows}
      >
        <TableHeader />
        <TableBody />
      </Table> */}
    </div>
  ));
};
