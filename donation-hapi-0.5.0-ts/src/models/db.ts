import { Db, DbTypes } from "../types/donation-stores";
import { connectFirebase } from "./firebase/connect.js";

// eslint-disable-next-line import/no-mutable-exports
export let db: Db;

export function connectDb(dbType: DbTypes) {
  switch (dbType) {
    case "firebase":
      db = connectFirebase();
      break;
    default:
  }
}
