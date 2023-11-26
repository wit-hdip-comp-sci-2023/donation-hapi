import { userStore } from "./firebase/user-store";
import { candidateStore } from "./firebase/candidate-store";
import { donationStore } from "./firebase/donation-store";
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
