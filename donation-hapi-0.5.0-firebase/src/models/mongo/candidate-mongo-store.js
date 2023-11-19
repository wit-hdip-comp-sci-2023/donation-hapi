import { Candidate } from "./candidate.js";

export const candidateMongoStore = {
  async find() {
    const candidates = await Candidate.find().lean();
    return candidates;
  },

  async findOne(id) {
    const candidate = await Candidate.findOne({ _id: id }).lean();
    return candidate;
  },

  async findBy(lastName, firstName) {
    const candidate = await Candidate.findOne({
      lastName,
      firstName,
    });
    return candidate;
  },
};
