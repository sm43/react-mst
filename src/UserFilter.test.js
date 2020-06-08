import React from "react";
import renderer from "react-test-renderer";
import fs from "fs";
import { Store } from "./store/userlist";
import { StoreContext } from "./store/store";
import { UserFilter } from "./UserFilter.js";
import { mount } from "enzyme";

const userFetcher = () =>
  Promise.resolve(JSON.parse(fs.readFileSync("./src/store/users.json")));

const store = Store.create({}, { fetch: userFetcher });

const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

describe("<UserFilter />", () => {
  it("should render correctly", () => {
    const component = renderer.create(<UserFilter />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

it("should filter by class 'FY'", () => {
  const component = mount(
    <StoreProvider>
      <UserFilter />
    </StoreProvider>
  );
  component
    .find("#check1")
    .simulate("click", { target: { checked: true, value: "FY" } });
  const list = store.userList;
  expect(list.length).toBe(3);
  component
    .find("#check1")
    .simulate("click", { target: { checked: false, value: "FY" } });
  component.unmount();
});

it("should sort by name", () => {
  const component = mount(
    <StoreProvider>
      <UserFilter />
    </StoreProvider>
  );
  component.find("#r1").simulate("click");
  const list = store.userList;
  expect(list[0].name).toBe("chandler");
  component.find("#r1").simulate("click");
  component.unmount();
});
