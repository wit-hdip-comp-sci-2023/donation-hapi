import { connectMongo } from "./mongo/connect.js";
import { connectFirebase } from "./firebase/connect.js";

export const db = {
  userStore: null,
  donationStore: null,
  candidateStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        connectMongo(this);
        break;
      case "firebase":
        connectFirebase(this);
        break;
      default:
    }
  },
};
