import { User } from "@/types";

export const createUser = async (user: User): Promise<string> => {
  const res = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      imageUrl: user.imageUrl,
    }),
  });
  const data = (await res.json()) as { userId: string };
  return data.userId;
};
