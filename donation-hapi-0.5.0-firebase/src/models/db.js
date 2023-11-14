import { userMongoStore } from "./mongo/user-mongo-store.js";
import { donationMongoStore } from "./mongo/donation-mongo-store.js";
import { candidateMongoStore } from "./mongo/candidate-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userFirebaseStore } from "./firebase/user-fire-store.js";
import { candidateFirebaseStore } from "./firebase/candidate-fire-store.js";
import { donationFireStore } from "./firebase/donation-fire-store.js";
import { connectFirebase } from "./firebase/connect.js";

export const db = {
  userStore: null,
  donationStore: null,
  candidateStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.donationStore = donationMongoStore;
        this.candidateStore = candidateMongoStore;
        connectMongo();
        break;
      case "firebase":
        this.userStore = userFirebaseStore;
        this.candidateStore = candidateFirebaseStore;
        this.donationStore = donationFireStore;
        connectFirebase();
        break;
      default:
    }
  },
};
