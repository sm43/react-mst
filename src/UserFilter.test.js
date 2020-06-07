import React from "react";
import renderer from "react-test-renderer";
import fs from "fs";
import { Store } from "./store/userlist";
import { StoreContext } from "./store/store";
import "./App.css";
import { UserFilter } from "./UserFilter.js";
import { mount } from "enzyme";

var store;
const userFetcher = () =>
  Promise.resolve(JSON.parse(fs.readFileSync("./src/store/users.json")));
const StoreProvider = ({ children }) => {
  store = Store.create({}, { fetch: userFetcher });
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

it("should render banner text correctly with given strings", () => {
  const component = mount(
    <StoreProvider>
      <UserFilter />
    </StoreProvider>
  );
  component
    .find('input[type="checkbox"]')
    .at(1)
    .simulate("change", { target: { checked: true } });

  expect(component).toMatchSnapshot();
    // const store = StoreProvider.StoreContext.Provider.value
    // store.count

});

// const component = mount(
//     <StoreProvider>
//       <UserFilter />
//     </StoreProvider>
//   );
//   expect(component).toMatchSnapshot();
//   // component.find("checkbox#c1").simulate('change', {target: {checked: true}});
//   var checkbox = component.find("#checkbox").eq('c1');
//   checkbox.simulate("change", { target: { checked: true } });
//   component.unmount();
