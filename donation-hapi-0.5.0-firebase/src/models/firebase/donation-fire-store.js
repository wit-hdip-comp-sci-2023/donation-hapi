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
      const donationValue = {
        amount: donation.amount,
        method: donation.method,
        donor: donation.donor,
        candidate: donation.candidate,
      };
      donations.push({ _id: childKey, ...donationValue });
    });

    for (let i = 0; i < donations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      donations[i].donor = await userFirebaseStore.getUserById(donations[i].donor);
      // eslint-disable-next-line no-await-in-loop
      donations[i].candidate = await candidateFirebaseStore.getCandidateById(donations[i].candidate);
    }

    return donations;
  },

  async getDonationsByCandidate(id) {
    const emailQuery = query(usersRef, orderByChild("donor"), equalTo(id));
    const snapshot = await get(emailQuery);
    const result = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      result.push({ _id: childKey, ...childData });
    });
    return result.length ? result[0] : null;
  },

  async donate(amount, method, donor, candidate, lat, lng) {
    const donation = {
      amount,
      method,
      donor: donor,
      candidate: candidate,
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
