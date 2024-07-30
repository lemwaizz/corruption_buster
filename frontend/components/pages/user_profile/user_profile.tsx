"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";
import { getUser, updateUser } from "@/firebase/firestore/storage";
import { User } from "@/types";
import { PacmanLoader } from "react-spinners";
import Link from "next/link";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { LoadingBanner } from "@/components/shared/loading_banner/loading_banner";

interface UserProfileProps {
  userId: string;
}

const UserProfileContents: React.FC<UserProfileProps> = ({ userId }) => {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const [firstName, setFirstName] = React.useState<string | undefined>("");
  const [lastName, setLastName] = React.useState<string | undefined>("");
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<User>("/user", async () => {
    const res = await getUser(userId);
    return res;
  });
  const [loading, setLoading] = React.useState(false);
  const [dialogOpenState, setDialogOpenState] = React.useState(false);

  React.useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName ?? "");
  }, [user]);

  const userNameChange = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    if (!firstName && !lastName) {
      toast({
        title: "Error",
        description: "At least one change is required",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      await updateUser({
        userId: user?.id!,
        firstName: firstName,
        lastName: lastName,
      });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      mutate("/user");
      setDialogOpenState(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return isLoading ? (
    <>
      <div className="flex justify-center items-center">
        <PacmanLoader size={30} />
      </div>
    </>
  ) : (
    <>
      {loading && <LoadingBanner loading={loading} />}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>These are your details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center flex-col">
            <div>
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={
                    user?.imageUrl ??
                    "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
                  }
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </div>
            <div className="my-4">
              <div className="flex gap-3">
                <p className="font-bold text-lg">User Name:</p>
                <div className=" flex gap-2 items-center">
                  <p className="text-lg">
                    {user?.firstName} {user?.lastName ? user.lastName : ""}
                  </p>
                  <div>
                    <Dialog
                      onOpenChange={setDialogOpenState}
                      open={dialogOpenState}
                    >
                      <DialogTrigger>
                        <Edit />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              First Name
                            </Label>
                            <Input
                              id="name"
                              defaultValue="Name"
                              className="col-span-3"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Last Name
                            </Label>
                            <Input
                              id="username"
                              defaultValue="@peduarte"
                              className="col-span-3"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onSubmit={userNameChange}
                            onClick={userNameChange}
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <p className="font-bold text-lg">Email:</p>
                <p className="text-lg">{user?.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
export default UserProfileContents;
