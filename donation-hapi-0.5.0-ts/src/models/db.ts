// import { connectMongo } from "./mongo/connect.js";
// import { connectFirebase } from "./firebase/connect.js";
import { Db, DbTypes } from "../types/donation-stores.js";
import { userStore } from "./firebase/user-store.js";
import { candidateStore } from "./firebase/candidate-store.js";
import { donationStore } from "./firebase/donation-store.js";

export const db: Db = {
  userStore: userStore,
  candidateStore: candidateStore,
  donationStore: donationStore,

  init(dbType: DbTypes): void {
    // switch (dbType) {
    //   case "mongo":
    //     connectMongo(this);
    //     break;
    //   case "firebase":
    //     connectFirebase(this);
    //     break;
    //   default:
    // }
  },
};
