import { ref, set, child, remove } from "firebase/database";
import { find, findOne, add, findBy, edit } from "./firebase-utils.js";
import { firebaseDatabase } from "./connect.js";
import type { Store, User } from "../../types/donation-stores";

export const userStore: Store = {
  doc: ref(firebaseDatabase, "users"),

  async find(): Promise<User[]> {
    const users = (await find(this.doc)) as User[];
    return users;
  },

  async findOne(id: string): Promise<User> {
    const user = (await findOne(this.doc, id)) as User;
    return user;
  },

  async add(obj: User): Promise<User> {
    const user = (await add(this.doc, obj)) as User;
    return user;
  },

  async findBy(email: string): Promise<User | null> {
    const users = (await findBy(this.doc, "email", email)) as User[];
    return users.length ? users[0] : null;
  },

  async deleteOne(id: string): Promise<void> {
    await remove(child(this.doc, id));
  },

  async delete(): Promise<void> {
    await set(this.doc, {});
  },

  async edit(user: unknown): Promise<void> {
    await edit(this.doc, user);
  },
};
