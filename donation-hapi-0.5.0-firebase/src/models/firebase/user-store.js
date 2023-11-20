import { ref, set, child, remove } from "firebase/database";
import { find, findOne, add, findBy, edit } from "./firebase-utils.js";

export const userStore = {
  ref: null,

  setDatabase(database) {
    this.ref = ref(database, "users");
  },

  async find() {
    const users = await find(this.ref);
    return users;
  },

  async findOne(id) {
    const user = await findOne(this.ref, id);
    return user;
  },

  async add(obj) {
    const user = await add(this.ref, obj);
    return user;
  },

  async findBy(email) {
    const users = await findBy(this.ref, "email", email);
    return users.length ? users[0] : null;
  },

  async deleteOne(id) {
    await remove(child(this.ref, id));
  },

  async delete() {
    await set(this.ref, {});
  },

  async edit(user) {
    await edit(this.ref, user);
  },
};
