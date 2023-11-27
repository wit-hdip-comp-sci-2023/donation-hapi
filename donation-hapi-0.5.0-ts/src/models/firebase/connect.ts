import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";
import { getDatabase, ref } from "firebase/database";
import { userStore } from "./user-store.js";
import { candidateStore } from "./candidate-store.js";
import { donationStore } from "./donation-store.js";
import { Db } from "../../types/donation-stores.js";

export function connectFirebase(): Db {
  dotenv.config();
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);
  candidateStore.doc = ref(database, "candidates");
  userStore.doc = ref(database, "users");
  donationStore.doc = ref(database, "donations");
  const db: Db = {
    userStore: userStore,
    candidateStore: candidateStore,
    donationStore: donationStore,
  };
  return db;
}

export function demo() {
  console.log("test");
}
