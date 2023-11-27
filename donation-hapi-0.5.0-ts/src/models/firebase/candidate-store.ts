import { set, child, remove, DatabaseReference } from "firebase/database";
import { find, findOne, edit, add, findBy } from "./firebase-utils.js";
import { Store } from "../../types/donation-stores.js";
import { Candidate } from "../../types/donation-types.js";

export const candidateStore: Store = {
  doc: <DatabaseReference>{},

  async find(): Promise<Candidate[]> {
    const candidates = (await find(this.doc)) as Candidate[];
    return candidates;
  },

  async findOne(id: string): Promise<Candidate> {
    const candidate = (await findOne(this.doc as DatabaseReference, id)) as Candidate;
    return candidate;
  },

  async add(obj: Candidate): Promise<Candidate> {
    const candidate = (await add(this.doc as DatabaseReference, obj)) as Candidate;
    return candidate;
  },

  async findBy(email: string): Promise<Candidate | null> {
    const candidates = (await findBy(this.doc as DatabaseReference, "lastName", email)) as Candidate[];
    return candidates.length > 0 ? candidates[0] : null;
  },

  async deleteOne(id: string): Promise<void> {
    await remove(child(this.doc as DatabaseReference, id));
  },

  async delete(): Promise<void> {
    await set(this.doc as DatabaseReference, {});
  },

  async edit(candidate: unknown): Promise<void> {
    await edit(this.doc as DatabaseReference, candidate);
  },
};
