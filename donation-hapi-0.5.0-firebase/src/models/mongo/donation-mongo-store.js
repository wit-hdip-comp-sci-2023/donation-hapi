import { Donation } from "./donation.js";

export const donationMongoStore = {
  async getAllDonations() {
    const donations = await Donation.find().populate("donor").populate("candidate").lean();
    return donations;
  },

  async getDonationsByCandidate(id) {
    const donations = await Donation.find({ candidate: id });
    return donations;
  },

  async donate(amount, method, donor, candidate, lat, lng) {
    let newDonation = new Donation({
      amount,
      method,
      donor: donor._id,
      candidate: candidate._id,
      lat,
      lng,
    });
    await newDonation.save();
    newDonation = await Donation.findOne({ _id: newDonation._id }).populate("candidate").populate("donor").lean();
    return newDonation;
  },

  async deleteAll() {
    await Donation.deleteMany({});
  },
};
