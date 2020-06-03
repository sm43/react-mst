import React from "react";
import { Store } from "./userlist";
import { API_URL } from "./../config.js";

export const StoreContext = React.createContext(Store.create());

const fetcher = () =>
  window.fetch(`${API_URL}/users`).then((response) => response.json());

export const StoreProvider = ({ children }: any) => {
  const store = Store.create({}, { fetch: fetcher });
  localStorage.setItem("token", "");

  setInterval(function () {
    store.afterCreate();
  }, 60000);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
