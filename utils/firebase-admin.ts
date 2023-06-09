import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import * as dotenv from "dotenv";

export default function getDb() {
  dotenv.config();

  try {
    return getFirestore();
  } catch {
    initializeApp({
      credential: cert({
        projectId: process.env?.FIREBASE_PROJECT_ID ?? "",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
      }),
    });
    return getFirestore();
  }
}
