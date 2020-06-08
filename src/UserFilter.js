import React from "react";
import { StoreContext } from "./store/store";

export const UserFilter = () => {
  const store = React.useContext(StoreContext);
  const filter = [];
  const setSort = (e) => {
    if (e.target.value === "Name") {
      store.setSort("name");
    } else if (e.target.value === "Age") {
      store.setSort("age");
    } else if (e.target.value === "No") {
      store.setSort("");
    }
  };
  const setClass = (e) => {
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
  };
  return (
    <div>
      <h3>Filter: </h3>
      <div>
        <input
          type="checkbox"
          id="check1"
          defaultChecked={false}
          value="FY"
          onClick={(e) => {
            setClass(e);
          }}
        />{" "}
        FY
        <input
          type="checkbox"
          id="check2"
          defaultChecked={false}
          value="SY"
          onClick={(e) => {
            setClass(e);
          }}
        />{" "}
        SY
        <input
          type="checkbox"
          id="check2"
          defaultChecked={false}
          value="TY"
          onClick={(e) => {
            setClass(e);
          }}
        />{" "}
        TY
      </div>
      <div>
        <h3>Sort By:</h3>
        <input
          type="radio"
          id="r1"
          name="options"
          value="Name"
          onClick={(e) => {
            setSort(e);
          }}
        />{" "}
        Name
        <input
          type="radio"
          id="r2"
          name="options"
          value="Age"
          onClick={(e) => {
            setSort(e);
          }}
        />{" "}
        Age
        <input
          type="radio"
          id="r3"
          name="options"
          value="No"
          defaultChecked
          onClick={(e) => {
            setSort(e);
          }}
        />{" "}
        No Sort
      </div>
    </div>
  );
};
