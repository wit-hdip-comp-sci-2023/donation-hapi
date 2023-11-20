import { ref, set } from "firebase/database";
import { find, add, findBy } from "./firebase-utils.js";
import { userStore } from "./user-store.js";
import { candidateStore } from "./candidate-store.js";

export const donationStore = {
  ref: null,

  setDatabase(database) {
    this.ref = ref(database, "donations");
  },

  async find() {
    const donations = await find(this.ref);
    for (let i = 0; i < donations.length; i += 1) {
      donations[i].donor = await userStore.findOne(donations[i].donor);
      donations[i].candidate = await candidateStore.findOne(donations[i].candidate);
    }
    return donations;
  },

  async findBy(id) {
    const donations = await findBy(this.ref, "candidate", id);
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
    const newDonation = await add(this.ref, donation);
    newDonation.donor = await userStore.findOne(donorId);
    newDonation.candidate = await candidateStore.findOne(candidateId);
    return newDonation;
  },

  async delete() {
    await set(this.ref, {});
  },
};
