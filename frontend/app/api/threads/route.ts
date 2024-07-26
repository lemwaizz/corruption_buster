import { verifyIdToken } from "@/firebase/server/verigy_id_token";
import { openai } from "@/openai/openai_client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  console.log(idToken);
  if (!(await verifyIdToken(idToken))) {
    return Response.json({}, { status: 404, statusText: "There was an error" });
  }
  const thread = await openai.beta.threads.create();
  return Response.json({ threadId: thread.id });
}
