import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.apiKey,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
