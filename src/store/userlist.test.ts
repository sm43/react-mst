import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { User, Store } from "./userlist";

it("can create an user", () => {
  const user = User.create({
    name: "test",
    age: 12,
    class: "SY",
  });

  expect(user.name).toBe("test");
  expect(user.age).toBe(12);
  expect(user.class).toBe("SY");
});

it("can create a store", () => {
  const userlist = Store.create({
    users: [
      { name: "test1", age: 12, class: "SY" },
      { name: "test2", age: 13, class: "TY" },
    ],
  });

  expect(userlist.users[0].name).toBe("test1");
  expect(userlist.users[1].name).toBe("test2");
});

it("can create empty store", () => {
  const list = Store.create({});
  expect(list.users.length).toBe(0);
});

it("can get number of users in a store", () => {
  const store = Store.create({
    users: [
      { name: "test1", age: 12, class: "SY" },
      { name: "test2", age: 13, class: "TY" },
    ],
  });
  const numberOfUser = store.count;
  expect(numberOfUser).toBe(2);
});

it("can add user to users list in Store", () => {
  const userStore = Store.create();

  const states = [];
  onSnapshot(userStore, (s) => states.push(s));
  const patches = [];
  onPatch(userStore, (p) => patches.push(p));

  userStore.add({ name: "test", age: 43, class: "SY" });
  const first = userStore.users[0];

  expect(first.name).toBe("test");
  expect(getSnapshot(userStore)).toMatchSnapshot();
  expect(patches).toMatchSnapshot();
});

it("can get users sorted by name", () => {
  const userStore = Store.create();

  const states = [];
  onSnapshot(userStore, (s) => states.push(s));
  const patches = [];
  onPatch(userStore, (p) => patches.push(p));

  userStore.add({ name: "rachel", age: 18, class: "FY" });
  userStore.add({ name: "joey", age: 27, class: "FY" });
  userStore.add({ name: "chandler", age: 28, class: "SY" });

  userStore.setSort("name");

  const list = userStore.userList
  expect(list[0].name).toBe("chandler");
  expect(getSnapshot(userStore)).toMatchSnapshot();
  expect(patches).toMatchSnapshot();
});

it("can get users sorted by age", () => {
  const userStore = Store.create();

  const states = [];
  onSnapshot(userStore, (s) => states.push(s));
  const patches = [];
  onPatch(userStore, (p) => patches.push(p));

  userStore.add({ name: "rachel", age: 18, class: "FY" });
  userStore.add({ name: "joey", age: 27, class: "FY" });
  userStore.add({ name: "chandler", age: 28, class: "SY" });

  userStore.setSort("age");

  const list = userStore.userList
  expect(list[0].name).toBe("rachel");
  expect(list[0].age).toBe(18);
  expect(getSnapshot(userStore)).toMatchSnapshot();
  expect(patches).toMatchSnapshot();
});

it("can get users filtered by class", () => {
  const userStore = Store.create();

  const states = [];
  onSnapshot(userStore, (s) => states.push(s));
  const patches = [];
  onPatch(userStore, (p) => patches.push(p));

  userStore.add({ name: "rachel", age: 18, class: "FY" });
  userStore.add({ name: "joey", age: 27, class: "FY" });
  userStore.add({ name: "chandler", age: 28, class: "SY" });

  userStore.setFilter(["FY"]);
  const list = userStore.userList
  expect(list.length).toBe(2);

  expect(getSnapshot(userStore)).toMatchSnapshot();
  expect(patches).toMatchSnapshot();
});

it("can get users filtered by class and sorted", () => {
  const userStore = Store.create();

  const states = [];
  onSnapshot(userStore, (s) => states.push(s));
  const patches = [];
  onPatch(userStore, (p) => patches.push(p));

  userStore.add({ name: "rachel", age: 18, class: "FY" });
  userStore.add({ name: "joey", age: 27, class: "FY" });
  userStore.add({ name: "chandler", age: 28, class: "SY" });

  userStore.setSort("name");
  userStore.setFilter(["FY"]);
  const list = userStore.userList
  expect(list.length).toBe(2);
  expect(list[0].name).toBe("joey");

  expect(getSnapshot(userStore)).toMatchSnapshot();
  expect(patches).toMatchSnapshot();
});
