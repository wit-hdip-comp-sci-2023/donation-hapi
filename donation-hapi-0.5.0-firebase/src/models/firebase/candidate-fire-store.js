import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";

export const candidateFirebaseStore = {
  ref: null,

  setDatabase(database) {
    this.ref = ref(database, "candidates");
  },

  async find() {
    const snapshot = await get(this.ref);
    const candidates = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      candidates.push({ _id: childKey, ...childData });
    });
    return candidates;
  },

  async findOne(id) {
    if (id) {
      const candidateRef = child(this.ref, id);
      const snapshot = await get(candidateRef);
      if (snapshot.exists()) {
        return { _id: id, ...snapshot.val() };
      }
    }
    return null;
  },

  async add(candidate) {
    const newCandidateRef = push(this.ref);
    await set(newCandidateRef, candidate);
    const newCandidate = (await get(newCandidateRef)).val();
    newCandidate._id = newCandidateRef.key;
    return newCandidate;
  },

  async findBy(lastName, firstName) {
    const emailQuery = query(this.ref, orderByChild("lastName"), equalTo(lastName));
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

  async edit(candidate) {
    const fixedCandidate = JSON.parse(JSON.stringify(candidate));
    const candidateId = fixedCandidate._id;
    delete fixedCandidate._id;
    const candidateRef = child(this.ref, candidateId);
    await update(candidateRef, fixedCandidate);
  },
};
