import { set, child, remove } from "firebase/database";
import { find, findOne, edit, add, findBy } from "./firebase-utils.js";
export const firebaseStore = {
    doc: {},
    async find() {
        const candidates = (await find(this.doc));
        return candidates;
    },
    async findOne(id) {
        const candidate = (await findOne(this.doc, id));
        return candidate;
    },
    async add(obj) {
        const candidate = (await add(this.doc, obj));
        return candidate;
    },
    async findBy(email) {
        const candidates = (await findBy(this.doc, "lastName", email));
        return candidates.length > 0 ? candidates[0] : null;
    },
    async deleteOne(id) {
        await remove(child(this.doc, id));
    },
    async delete() {
        await set(this.doc, {});
    },
    async edit(candidate) {
        await edit(this.doc, candidate);
    },
};
