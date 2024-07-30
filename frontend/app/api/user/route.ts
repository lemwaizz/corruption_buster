import { createUser, getUserDetails } from "@/firebase/server/db/user_db";
import { verifyIdToken } from "@/firebase/server/verigy_id_token";
import { User } from "@/types";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  console.log(idToken);
  if (!(await verifyIdToken(idToken))) {
    return Response.json({}, { status: 404, statusText: "Unauthorized" });
  }
  const user = (await request.json()) as User;
  try {
    const userId = await createUser(user);
    return Response.json({ userId: userId });
  } catch (error) {
    return Response.json(
      { error: error },
      { status: 404, statusText: "There was an error" }
    );
  }
}

export async function GET(request: Request) {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  console.log(idToken);
  const userId = await verifyIdToken(idToken);
  if (!userId) {
    return Response.json({}, { status: 404, statusText: "There was an error" });
  }
  try {
    const user = await getUserDetails(userId);
    return Response.json({ user: user });
  } catch (error) {
    return Response.json({}, { status: 404, statusText: "There was an error" });
  }
}
