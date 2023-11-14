import { ref, set, push, get, child, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { database } from "./connect.js";

const donationsRef = ref(database(), "donations");

export const donationFireStore = {
  async getAllDonations() {
    const snapshot = await get(donationsRef);
    const donations = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      candidates.push({ _id: childKey, ...childData });
    });
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
      donor: donor._id,
      candidate: candidate._id,
      lat,
      lng,
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
