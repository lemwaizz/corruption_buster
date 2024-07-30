import admin from "@/firebase/server/init";
import politicians from "./politicians.json";

const db = admin.firestore();

const main = async () => {
  const politicianRef = db.collection("politicians");
  politicians.map(async (politician) => {
    const res = await politicianRef.add(politician);
    console.log("politician added👤 with ID:", res.id);
  });
};

main().then(() => {
  console.log("COMPLETE 🚀🚀✅");
});
