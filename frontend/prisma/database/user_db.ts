import { User } from "@/types";
import prisma from "../client";

export const createUser = async (user: User): Promise<string> => {
  if (await userExists(user.id)) {
    throw new Error("user exists");
  }
  const userId = await prisma.user.create({
    data: {
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      imageUrl: user.imageUrl,
      lastName: user.lastName,
    },
    select: {
      id: true,
    },
  });
  return userId.id;
};

export const userExists = async (userId: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });
  return !!user;
};

export const getUserDetails = async (userId: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      firstName: true,
      imageUrl: true,
      id: true,
      lastName: true,
    },
  });
  if (!user) {
    throw new Error("user not found");
  }
  return {
    email: user?.email,
    firstName: user.firstName,
    id: user.id,
    imageUrl: user.imageUrl,
    lastName: user.lastName,
  };
};
