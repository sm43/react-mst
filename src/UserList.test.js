import React from "react";
import renderer from "react-test-renderer";
import fs from "fs";
import { Store } from "./store/userlist";
import { StoreContext } from "./store/store";
import "./App.css";
import { UserFilter, UserList } from "./UserList.js";
import { mount } from "enzyme";

const userFetcher = () =>
  Promise.resolve(JSON.parse(fs.readFileSync("./src/store/users.json")));

const store = Store.create({}, { fetch: userFetcher });

const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

describe("<UserList />", () => {
  it("should render correctly", () => {
    const component = renderer.create(<StoreProvider><UserList /></StoreProvider>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});