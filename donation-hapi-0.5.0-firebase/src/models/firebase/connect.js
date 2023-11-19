import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";
import { getDatabase } from "firebase/database";
import { userFirebaseStore } from "./user-fire-store.js";
import { candidateFirebaseStore } from "./candidate-fire-store.js";
import { donationFireStore } from "./donation-fire-store.js";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
};

export function connectFirebase(db) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  db.userStore = userFirebaseStore;
  db.candidateStore = candidateFirebaseStore;
  db.donationStore = donationFireStore;
  db.userStore.setDatabase(database);
  db.candidateStore.setDatabase(database);
  db.donationStore.setDatabase(database);
}
