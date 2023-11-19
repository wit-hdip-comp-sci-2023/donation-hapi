import { ref, set, child, remove } from "firebase/database";
import { find, findOne, edit } from "./firebase-utils.js";

export const candidateFirebaseStore = {
  ref: null,

  setDatabase(database) {
    this.ref = ref(database, "candidates");
  },

  async find() {
    const candidates = await find(this.ref);
    return candidates;
  },

  async findOne(id) {
    const candidate = findOne(this.ref, id);
    return candidate;
  },

  async add(obj) {
    const candidate = await add(this.ref, obj);
    return candidate;
  },

  async deleteOne(id) {
    await remove(child(this.ref, id));
  },

  async delete() {
    await set(this.ref, {});
  },

  async edit(candidate) {
    await edit(this.ref, candidate);
  },
};
