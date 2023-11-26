import { connectMongo } from "./mongo/connect.js";
import { connectFirebase } from "./firebase/connect.js";
import { Db, DbTypes, Store } from "../types/donation-stores";
import { userStore } from "./firebase/user-store";
import { candidateStore } from "./firebase/candidate-store";
import { donationStore } from "./firebase/donation-store";

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
