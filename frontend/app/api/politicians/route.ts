import { verifyIdToken } from "@/firebase/server/verigy_id_token";

export async function GET(request: Request) {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  console.log(idToken);
  const userId = await verifyIdToken(idToken);
  if (!userId) {
    return Response.json({}, { status: 404, statusText: "There was an error" });
  }
  try {
    // const user = await getUserDetails(userId);
    // return Response.json({ user: user });
  } catch (error) {
    return Response.json({}, { status: 404, statusText: "There was an error" });
  }
}
