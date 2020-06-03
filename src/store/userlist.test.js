import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { User, Store } from "./userlist";
import * as fs from "fs";
import { when } from "mobx";

const userFetcher = () =>
  Promise.resolve(JSON.parse(fs.readFileSync("./src/store/users.json")));

it("can create an user", () => {
  const user = User.create({
    id: 1,
    name: "test",
    age: 12,
    class: "SY",
  });

  expect(user.name).toBe("test");
  expect(user.age).toBe(12);
  expect(user.class).toBe("SY");
});

it("can create a store", (done) => {
  const store = Store.create({}, { fetch: userFetcher });
  expect(store.count).toBe(0);
  expect(store.isLoading).toBe(true);
  when(
    () => !store.isLoading,
    () => {
      expect(store.count).toBe(6);
      expect(store.isLoading).toBe(false);
      done();
    }
  );
});

it("can add user in a store", (done) => {
  const store = Store.create({}, { fetch: userFetcher });
  expect(store.count).toBe(0);
  expect(store.isLoading).toBe(true);
  when(
    () => !store.isLoading,
    () => {
      expect(store.isLoading).toBe(false);

      const states = [];
      onSnapshot(store, (s) => states.push(s));
      const patches = [];
      onPatch(store, (p) => patches.push(p));

      store.add({ id: 43, name: "test", age: 43, class: "SY" });
      expect(store.count).toBe(7);
      expect(getSnapshot(store)).toMatchSnapshot();
      expect(patches).toMatchSnapshot();
      done();
    }
  );
});

it("can get users sorted", (done) => {
  const store = Store.create({}, { fetch: userFetcher });
  expect(store.count).toBe(0);
  expect(store.isLoading).toBe(true);
  when(
    () => !store.isLoading,
    () => {
      expect(store.isLoading).toBe(false);

      const states = [];
      onSnapshot(store, (s) => states.push(s));
      const patches = [];
      onPatch(store, (p) => patches.push(p));

      //Sorted by name
      store.setSort("name");
      const list = store.userList;
      expect(list[0].name).toBe("chandler");
      expect(getSnapshot(store)).toMatchSnapshot();
      expect(patches).toMatchSnapshot();
      done();
    }
  );
});

it("can get users filtered by class", (done) => {
  const store = Store.create({}, { fetch: userFetcher });
  expect(store.count).toBe(0);
  expect(store.isLoading).toBe(true);
  when(
    () => !store.isLoading,
    () => {
      expect(store.isLoading).toBe(false);

      const states = [];
      onSnapshot(store, (s) => states.push(s));
      const patches = [];
      onPatch(store, (p) => patches.push(p));

      store.setFilter(["FY"]);
      const list = store.userList;
      expect(list.length).toBe(3);
      expect(getSnapshot(store)).toMatchSnapshot();
      expect(patches).toMatchSnapshot();
      done();
    }
  );
});

it("can get users filtered by class and sorted", (done) => {
  const store = Store.create({}, { fetch: userFetcher });
  expect(store.count).toBe(0);
  expect(store.isLoading).toBe(true);
  when(
    () => !store.isLoading,
    () => {
      expect(store.isLoading).toBe(false);

      const states = [];
      onSnapshot(store, (s) => states.push(s));
      const patches = [];
      onPatch(store, (p) => patches.push(p));

      store.setSort("name");
      store.setFilter(["FY"]);
      const list = store.userList;
      expect(list.length).toBe(3);
      expect(list[0].name).toBe("joey");
      expect(getSnapshot(store)).toMatchSnapshot();
      expect(patches).toMatchSnapshot();
      done();
    }
  );
});
