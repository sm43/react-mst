import React from "react";
import { Store } from "./userlist";

export const StoreContext = React.createContext(Store.create());

export const StoreProvider = ({ children }: any) => {
  const store = Store.create({
    users: [
      { name: "rachel", age: 18, class: "FY" },
      { name: "monica", age: 21, class: "SY" },
      { name: "joey", age: 27, class: "FY" },
      { name: "phoebe", age: 22, class: "TY" },
      { name: "ross", age: 17, class: "FY" },
      { name: "chandler", age: 28, class: "SY" },
    ],
  });
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
