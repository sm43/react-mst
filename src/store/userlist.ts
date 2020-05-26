import { types, Instance } from "mobx-state-tree";
import { values } from "mobx";

export const User = types.model({
  name: types.optional(types.string, ""),
  age: types.optional(types.integer, 0),
  class: types.optional(types.string, ""),
});

export const Store = types
  .model({
    users: types.array(User),
    filter: types.optional(types.array(types.string), []),
    sort: types.optional(types.string, ""),
  })
  .views((self) => ({
    get count() {
      return self.users.length;
    },
    get userList() {
      return filterAndSortUsers(values(self.users), self.filter, self.sort);
    },
  }))
  .actions((self) => ({
    add(item: UserItem) {
      self.users.push(item);
    },
    setSort(sort: string) {
      self.sort = sort;
    },
    setFilter(filter: any) {
      self.filter = filter;
    },
  }));

export interface UserItem extends Instance<typeof User> {}

function filterAndSortUsers(users: any, filter: any, sort: any) {
  if (filter.length === 0 && sort === "") {
    return users;
  }
  if (filter.length === 0) {
    if (sort === "name") {
      return users.sort((a: UserItem, b: UserItem) =>
        a.name > b.name ? 1 : a.name === b.name ? 0 : -1
      );
    } else if (sort === "age") {
      return users.sort((a: UserItem, b: UserItem) =>
        a.age > b.age ? 1 : a.age === b.age ? 0 : -1
      );
    } else {
      return users;
    }
  }
  if (sort === "name") {
    return users
      .filter((u: UserItem) => filter.includes(u.class))
      .sort((a: UserItem, b: UserItem) =>
        a.name > b.name ? 1 : a.name === b.name ? 0 : -1
      );
  } else if (sort === "age") {
    return users
      .filter((u: UserItem) => filter.includes(u.class))
      .sort((a: UserItem, b: UserItem) =>
        a.age > b.age ? 1 : a.age === b.age ? 0 : -1
      );
  } else {
    return users.filter((u: UserItem) => filter.includes(u.class));
  }
}
