import { types, getEnv, flow } from "mobx-state-tree";
import { values } from "mobx";

export const User = types.model({
  id: types.integer,
  name: types.optional(types.string, ""),
  age: types.optional(types.integer, 0),
  class: types.optional(types.string, ""),
});

export const Store = types
  .model({
    users: types.array(User),
    filter: types.optional(types.array(types.string), []),
    sort: types.optional(types.string, ""),
    isLoading: true,
  })
  .views((self) => ({
    get count() {
      return self.users.length;
    },
    get userList() {
      return filterAndSortUsers(values(self.users), self.filter, self.sort);
    },
    get fetch() {
      return getEnv(self).fetch;
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self.users.clear();
      loadUsers(self);
    },
    add(item) {
      self.users.push(item);
    },
    setSort(sort) {
      self.sort = sort;
    },
    setFilter(filter) {
      self.filter = filter;
    },
    setStatus(status) {
      self.isLoading = status;
    },
  }));

const loadUsers = flow(function* loadUsers(self) {
  try {
    const json = yield self.fetch("./users.json");
    json.forEach((userJson) => {
      self.add(userJson);
    });
    self.setStatus(false)
  } catch (err) {
    console.error("Failed to load users ", err);
  }
});

function filterAndSortUsers(users, filter, sort) {
  if (filter.length === 0 && sort === "") {
    return users;
  }
  if (filter.length === 0) {
    if (sort === "name") {
      return users.sort((a, b) =>
        a.name > b.name ? 1 : a.name === b.name ? 0 : -1
      );
    } else if (sort === "age") {
      return users.sort((a, b) =>
        a.age > b.age ? 1 : a.age === b.age ? 0 : -1
      );
    } else {
      return users;
    }
  }
  if (sort === "name") {
    return users
      .filter((u) => filter.includes(u.class))
      .sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? 0 : -1));
  } else if (sort === "age") {
    return users
      .filter((u) => filter.includes(u.class))
      .sort((a, b) => (a.age > b.age ? 1 : a.age === b.age ? 0 : -1));
  } else {
    return users.filter((u) => filter.includes(u.class));
  }
}
