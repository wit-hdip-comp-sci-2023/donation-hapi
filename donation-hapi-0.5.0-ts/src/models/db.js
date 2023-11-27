import { connectFirebase } from "./firebase/connect.js";
// eslint-disable-next-line import/no-mutable-exports
export let db;
export function connectDb(dbType) {
    switch (dbType) {
        case "firebase":
            db = connectFirebase();
            break;
        default:
    }
}
