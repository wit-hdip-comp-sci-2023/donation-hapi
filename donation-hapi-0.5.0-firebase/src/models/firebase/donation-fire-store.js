import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { userFirebaseStore } from "./user-fire-store.js";
import { candidateFirebaseStore } from "./candidate-fire-store.js";

export const donationFireStore = {
  ref: null,

  setDatabase(database) {
    this.ref = ref(database, "donations");
  },

  async find() {
    const snapshot = await get(this.ref);
    const donations = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const donation = childSnapshot.val();
      donations.push({ _id: childKey, ...donation });
    });
    for (let i = 0; i < donations.length; i += 1) {
      donations[i].donor = await userFirebaseStore.getUserById(donations[i].donor);
      donations[i].candidate = await candidateFirebaseStore.getCandidateById(donations[i].candidate);
    }
    return donations;
  },

  async findBy(id) {
    const donorQuery = query(this.ref, orderByChild("candidate"), equalTo(id));
    const snapshot = await get(donorQuery);

    const donations = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      donations.push({ _id: childKey, ...childData });
    });
    return donations;
  },

  async donate(amount, method, donorId, candidateId, lat, lng) {
    const donation = {
      amount,
      method,
      donor: donorId,
      candidate: candidateId,
      lat: lat,
      lng: lng,
    };
    const newDonationRef = push(this.ref);
    await set(newDonationRef, donation);
    const newDonation = (await get(newDonationRef)).val();
    newDonation._id = newDonationRef.key;
    return newDonation;
  },

  async delete() {
    await set(this.ref, {});
  },
};
