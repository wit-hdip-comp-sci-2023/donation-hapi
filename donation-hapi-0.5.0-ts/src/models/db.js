import { userStore } from "./firebase/user-store.js";
import { candidateStore } from "./firebase/candidate-store.js";
import { donationStore } from "./firebase/donation-store.js";
export const db = {
    userStore: userStore,
    candidateStore: candidateStore,
    donationStore: donationStore,
    init(dbType) {
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
