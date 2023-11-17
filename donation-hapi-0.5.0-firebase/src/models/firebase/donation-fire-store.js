import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { database } from "./connect.js";
import { userFirebaseStore } from "./user-fire-store.js";
import { candidateFirebaseStore } from "./candidate-fire-store.js";

const donationsRef = ref(database(), "donations");

export const donationFireStore = {
  async getAllDonations() {
    const snapshot = await get(donationsRef);
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

  async getDonationsByCandidate(id) {
    const donorQuery = query(donationsRef, orderByChild("candidate"), equalTo(id));
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
    const newDonationRef = push(donationsRef);
    await set(newDonationRef, donation);
    const newDonation = (await get(newDonationRef)).val();
    newDonation._id = newDonationRef.key;
    return newDonation;
  },

  async deleteAll() {
    await set(donationsRef, {});
  },
};
