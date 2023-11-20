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

export function connectFirebase(db) {
  let firebaseApp;
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  const database = getDatabase(firebaseApp);
  db.userStore = userStore;
  db.candidateStore = candidateStore;
  db.donationStore = donationStore;
  db.userStore.setDatabase(database);
  db.candidateStore.setDatabase(database);
  db.donationStore.setDatabase(database);
}
