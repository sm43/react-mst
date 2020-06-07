import React from "react";
import { StoreContext } from "./store/store";

export const UserFilter = () => {
  const store = React.useContext(StoreContext);
  const filter = [];
  return (
    <div>
      <h3>Filter: </h3>
      <div
        onChange={(e) => {
          if (
            e.target.value === "FY" ||
            e.target.value === "SY" ||
            e.target.value === "TY"
          ) {
            if (e.target.checked === true) {
              filter.push(e.target.value);
            } else {
              var index = filter.indexOf(e.target.value);
              while (index !== -1) {
                filter.splice(index, 1);
                index = filter.indexOf(e.target.value);
              }
            }
            store.setFilter(filter);
          }
        }}
      >
        <input type="checkbox" id="c1" defaultChecked={false} value="FY" /> FY
        <input type="checkbox" id="c2" defaultChecked={false} value="SY" /> SY
        <input type="checkbox" id="c3" defaultChecked={false} value="TY" /> TY
      </div>
      <div
        onChange={(e) => {
          if (e.target.value === "Name") {
            store.setSort("name");
          } else if (e.target.value === "Age") {
            store.setSort("age");
          } else if (e.target.value === "No") {
            store.setSort("");
          }
        }}
      >
        <h3>Sort By:</h3>
        <input type="radio" name="options" value="Name" /> Name
        <input type="radio" name="options" value="Age" /> Age
        <input type="radio" name="options" value="No" defaultChecked /> No Sort
      </div>
    </div>
  );
};
