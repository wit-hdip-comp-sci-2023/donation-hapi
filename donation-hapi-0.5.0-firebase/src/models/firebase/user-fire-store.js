import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";

export const userFirebaseStore = {
  ref: null,

  setDatabase(database) {
    this.ref = ref(database, "users");
  },

  async find() {
    const snapshot = await get(this.ref);
    const users = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      users.push({ _id: childKey, ...childData });
    });
    return users;
  },

  async findOne(id) {
    if (id) {
      const userRef = child(this.ref, id);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return { _id: id, ...snapshot.val() };
      }
    }
    return null;
  },

  async add(user) {
    const newUserRef = push(this.ref);
    await set(newUserRef, user);
    const newUser = (await get(newUserRef)).val();
    newUser._id = newUserRef.key;
    return newUser;
  },

  async findByl(email) {
    const emailQuery = query(this.ref, orderByChild("email"), equalTo(email));
    const snapshot = await get(emailQuery);
    const result = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      result.push({ _id: childKey, ...childData });
    });
    // Check if the result array has any elements, if so - return result[0], otherwise return null
    return result.length ? result[0] : null;
  },

  async deleteOne(id) {
    await remove(child(this.ref, id));
  },

  async delete() {
    await set(this.ref, {});
  },

  async edit(user) {
    const fixedUser = JSON.parse(JSON.stringify(user));
    const userId = fixedUser._id;
    delete fixedUser._id;
    const userRef = child(this.ref, userId);
    await update(userRef, fixedUser);
  },
};
