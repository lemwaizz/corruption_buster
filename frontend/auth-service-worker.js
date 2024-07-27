import { initializeApp } from "firebase/app";
import { getAuth, getIdToken } from "firebase/auth";
import { getInstallations, getToken } from "firebase/installations";

// this is set during install
let firebaseConfig;
const config = {
  apiKey: "AIzaSyClzj9XvdIr2qb-De4daqzQ_uRVb5vzuVQ",
  authDomain: "corruptionbuster-4b32d.firebaseapp.com",
  projectId: "corruptionbuster-4b32d",
  storageBucket: "corruptionbuster-4b32d.appspot.com",
  messagingSenderId: "482627604239",
  appId: "1:482627604239:web:1e56316d8e0dfb5677f87a",
};

self.addEventListener("install", (event) => {
  // extract firebase config from query string
  const serializedFirebaseConfig = new URL(location).searchParams.get(
    "firebaseConfig"
  );

  if (!serializedFirebaseConfig) {
    throw new Error(
      "Firebase Config object not found in service worker query string."
    );
  }

  firebaseConfig = JSON.parse(serializedFirebaseConfig);
  console.log("Service worker installed with Firebase config", firebaseConfig);
});

self.addEventListener("activate", function (event) {
  console.log("Claiming control");
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { origin } = new URL(event.request.url);
  console.log("🪽🪽😁 Request going through");
  console.log("🏫⚖️ORIGIN" + origin);
  if (origin !== self.location.origin) {
    return;
  }
  event.respondWith(fetchWithFirebaseHeaders(event.request));
});

async function fetchWithFirebaseHeaders(request) {
  console.log("WE ARE APPENDING HEADERS🤯🤯");
  const app = initializeApp(config);
  const auth = getAuth(app);
  const installations = getInstallations(app);
  const headers = new Headers(request.headers);
  const [authIdToken, installationToken] = await Promise.all([
    getAuthIdToken(auth),
    getToken(installations),
  ]);
  headers.append("Firebase-Instance-ID-Token", installationToken);
  if (authIdToken) headers.append("Authorization", `Bearer ${authIdToken}`);
  const newRequest = new Request(request, { headers });
  return await fetch(newRequest);
}

async function getAuthIdToken(auth) {
  await auth.authStateReady();
  if (!auth.currentUser) return;
  return await getIdToken(auth.currentUser);
}
