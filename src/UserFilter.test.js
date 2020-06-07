import React from "react";
import renderer from "react-test-renderer";
import fs from "fs";
import { Store } from "./store/userlist";
import { StoreContext } from "./store/store";
import "./App.css";
import { UserFilter } from "./UserFilter.js";
import { mount, shallow } from "enzyme";

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

it("should render banner text correctly with given strings", () => {
  // const component = shallow(
  //   <StoreProvider>
  //     <UserFilter />
  //   </StoreProvider>
  // );
  const component = mount(
    <StoreProvider>
      <UserFilter />
    </StoreProvider>
  );

  // component.find('input[name="options"]').at(1).simulate("click");
  // var checkbox = () => component.find('input[type="radio"]').at(1);
  component
    .find('input[type="checkbox"]')
    .at(0)
    .simulate("change", { target: { checked: true } });

  expect(component).toMatchSnapshot();
  console.log(store.count);
  const list = store.userList;
  console.log(list[0].name);
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
