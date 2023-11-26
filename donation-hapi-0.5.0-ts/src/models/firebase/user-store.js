import { ref, set, child, remove } from "firebase/database";
import { find, findOne, add, findBy, edit } from "./firebase-utils.js";
import { firebaseDatabase } from "./connect.js";
export const userStore = {
    doc: ref(firebaseDatabase, "users"),
    async find() {
        const users = (await find(this.doc));
        return users;
    },
    async findOne(id) {
        const user = (await findOne(this.doc, id));
        return user;
    },
    async add(obj) {
        const user = (await add(this.doc, obj));
        return user;
    },
    async findBy(email) {
        const users = (await findBy(this.doc, "email", email));
        return users.length ? users[0] : null;
    },
    async deleteOne(id) {
        await remove(child(this.doc, id));
    },
    async delete() {
        await set(this.doc, {});
    },
    async edit(user) {
        await edit(this.doc, user);
    },
};
