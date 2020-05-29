import React from "react";
import { Store } from "./userlist";

export const StoreContext = React.createContext(Store.create());

export const StoreProvider = ({ children }: any) => {
  const store = Store.create();
  store.fetchData();

  setInterval(function () {
    store.fetchData();
  }, 100000);

  const mockData = setInterval(function () {
    if (store.users.length === 0) {
      const users = [
        { id: 11, name: "rachel", age: 18, class: "FY" },
        { id: 12, name: "monica", age: 21, class: "SY" },
        { id: 13, name: "joey", age: 27, class: "FY" },
        { id: 14, name: "phoebe", age: 22, class: "TY" },
        { id: 15, name: "ross", age: 17, class: "FY" },
        { id: 16, name: "chandler", age: 28, class: "SY" },
      ];
      users.forEach((user) => {
        store.add(user);
      });
    } else {
      clearInterval(mockData);
    }
  }, 10000);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
