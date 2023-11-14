import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { database } from "./connect.js";

const candidatesRef = ref(database(), "candidates");

export const candidateFirebaseStore = {
  async getAllCandidates() {
    const snapshot = await get(candidatesRef);
    const candidates = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      candidates.push({ _id: childKey, ...childData });
    });
    return candidates;
  },

  async getCandidateById(id) {
    if (id) {
      const CandidateRef = child(candidatesRef, id);
      const snapshot = await get(CandidateRef);
      if (snapshot.exists()) {
        return { _id: id, ...snapshot.val() };
      }
    }
    return null;
  },

  async addCandidate(Candidate) {
    const newCandidateRef = push(candidatesRef);
    await set(newCandidateRef, Candidate);
    const newCandidate = (await get(newCandidateRef)).val();
    newCandidate._id = newCandidateRef.key;
    return newCandidate;
  },

  async findByName(lastName, firstName) {
    const emailQuery = query(candidatesRef, orderByChild("lastName"), equalTo(lastName));
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

  async deleteCandidateById(id) {
    await remove(child(candidatesRef, id));
  },

  async deleteAllCandidates() {
    await set(candidatesRef, {});
  },

  async editCandidate(Candidate) {
    // Thanks to https://stackoverflow.com/questions/56298481/how-to-fix-object-null-prototype-title-product
    const fixedCandidate = JSON.parse(JSON.stringify(Candidate));
    const CandidateId = fixedCandidate._id;
    // Don't update the _id.
    delete fixedCandidate._id;

    // Update the Candidate
    const CandidateRef = child(candidatesRef, CandidateId);

    await update(CandidateRef, fixedCandidate);
  },
};
