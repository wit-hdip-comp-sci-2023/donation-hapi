import { initializeApp, getApps } from "firebase/app";
import * as dotenv from "dotenv";
import { getDatabase } from "firebase/database";
import { userStore } from "./user-store.js";
import { candidateStore } from "./candidate-store.js";
import { donationStore } from "./donation-store.js";
dotenv.config();
const firebaseConfig = {
    apiKey: process.env.apiKey,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
};
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(firebaseApp);
export function connectFirebase(db) {
    let firebaseApp;
    if (!getApps().length) {
        firebaseApp = initializeApp(firebaseConfig);
    }
    db.userStore = userStore;
    db.candidateStore = candidateStore;
    db.donationStore = donationStore;
}
