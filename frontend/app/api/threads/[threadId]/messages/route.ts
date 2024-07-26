import admin from "@/firebase/server/init";
import { verifyIdToken } from "@/firebase/server/verigy_id_token";
import { openai } from "@/openai/openai_client";

export const runtime = "nodejs";
const ASSISTANT_ID = "asst_nr6gcaMU6jWqhHI1xnaE2lRu";

interface Params {
  params: {
    threadId: string;
  };
}

export async function POST(request: Request, { params: { threadId } }: Params) {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  console.log(idToken);
  if (!(await verifyIdToken(idToken))) {
    return Response.json({}, { status: 404, statusText: "There was an error" });
  }
  const { content } = (await request.json()) as { content: string };
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });
  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: ASSISTANT_ID,
  });
  return new Response(stream.toReadableStream());
}
