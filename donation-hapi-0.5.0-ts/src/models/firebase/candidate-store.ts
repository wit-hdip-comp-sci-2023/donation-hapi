import { ref, set, child, remove } from "firebase/database";
import { find, findOne, edit, add, findBy } from "./firebase-utils.js";
import { firebaseDatabase } from "./connect.js";
import type { Candidate, Store } from "../../types/donation-stores";

export const candidateStore: Store = {
  doc: ref(firebaseDatabase, "candidates"),

  async find(): Promise<Candidate[]> {
    const candidates = (await find(this.doc)) as Candidate[];
    return candidates;
  },

  async findOne(id: string): Promise<Candidate> {
    const candidate = (await findOne(this.doc, id)) as Candidate;
    return candidate;
  },

  async add(obj: Candidate): Promise<Candidate> {
    const candidate = (await add(this.doc, obj)) as Candidate;
    return candidate;
  },

  async findBy(email: string): Promise<Candidate | null> {
    const candidates = (await findBy(this.doc, "lastName", email)) as Candidate[];
    return candidates.length ? candidates[0] : null;
  },

  async deleteOne(id: string): Promise<void> {
    await remove(child(this.doc, id));
  },

  async delete(): Promise<void> {
    await set(this.doc, {});
  },

  async edit(candidate: unknown): Promise<void> {
    await edit(this.doc, candidate);
  },
};
