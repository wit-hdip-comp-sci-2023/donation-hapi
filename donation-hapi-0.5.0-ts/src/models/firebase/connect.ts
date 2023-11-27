import { initializeApp, getApps } from "firebase/app";
import * as dotenv from "dotenv";
import { Database, getDatabase } from "firebase/database";
import { userStore } from "./user-store.js";
import { candidateStore } from "./candidate-store.js";
import { donationStore } from "./donation-store.js";
import { Db } from "../../types/donation-stores.js";

// dotenv.config();

// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   databaseURL: process.env.databaseURL,
//   projectId: process.env.projectId,
// };

// const firebaseApp = initializeApp(firebaseConfig);
// export const firebaseDatabase = getDatabase(firebaseApp);

export function connectFirebase(db: Db) {
  // let firebaseApp;
  // if (!getApps().length) {
  //   firebaseApp = initializeApp(firebaseConfig);
  // }
  db.userStore = userStore;
  db.candidateStore = candidateStore;
  db.donationStore = donationStore;
}

export function getDb(): Database {
  dotenv.config();
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
  };
  const firebaseApp = initializeApp(firebaseConfig);
  return getDatabase(firebaseApp);
}
