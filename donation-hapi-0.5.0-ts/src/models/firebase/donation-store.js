import { ref, set, remove, child } from "firebase/database";
import { find, add, findBy, findOne, edit } from "./firebase-utils.js";
import { firebaseDatabase } from "./connect.js";
import { candidateStore } from "./candidate-store.js";
export const donationStore = {
    doc: ref(firebaseDatabase, "donations"),
    async find() {
        const donations = (await find(this.doc));
        for (let i = 0; i < donations.length; i += 1) {
            donations[i].candidate = (await candidateStore.findOne(donations[i].candidate));
        }
        return donations;
    },
    async findOne(id) {
        const donation = (await findOne(this.doc, id));
        return donation;
    },
    async findBy(id) {
        const donations = (await findBy(this.doc, "candidate", id));
        return donations;
    },
    async add(donation) {
        const newDonation = (await add(this.doc, donation));
        newDonation.candidate = (await candidateStore.findOne(donation.candidate));
        return newDonation;
    },
    async delete() {
        await set(this.doc, {});
    },
    async deleteOne(id) {
        await remove(child(this.doc, id));
    },
    async edit(candidate) {
        await edit(this.doc, candidate);
    },
};
