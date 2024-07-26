import * as admin from "firebase-admin";
import { credential } from "./creds";

if (!admin.apps.length) {
  admin.initializeApp({ credential: credential });
}

export default admin;
