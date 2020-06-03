import React from "react";
import renderer from "react-test-renderer";
import fs from "fs";
import { Store } from "./store/userlist";
import "./App.css";
import { UserList } from "./UserList.js";
import { UserFilter } from "./UserFilter.js";
import { UserForm } from "./UserForm.js";
import { NavBar } from "./Navigation.js";
import SplitPane from "react-split-pane";
import { StoreContext } from "./store/store";

const userFetcher = () =>
  Promise.resolve(JSON.parse(fs.readFileSync("./src/store/users.json")));

const StoreProvider = ({ children }) => {
  const store = Store.create({}, { fetch: userFetcher });
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

it("matches snapshot before and after loading", (done) => {
  const app = renderer.create(
    <StoreProvider>
      <header>
        <NavBar />
      </header>
      <main>
        <SplitPane split="vertical" minSize={500}>
          <div>
            <UserForm />
          </div>
          <div>
            <UserFilter />
            <UserList />
          </div>
        </SplitPane>
      </main>
    </StoreProvider>
  );
  let tree = app.toJSON();
  expect(tree).toMatchSnapshot();

  setTimeout(() => {
    let tree = app.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 100);
});
