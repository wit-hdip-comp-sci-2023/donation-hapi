import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
};

let db = null;

export function connectFirebase() {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
}

export function database() {
  if (!db) {
    connectFirebase();
  }
  return db;
}
