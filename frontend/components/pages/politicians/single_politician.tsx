"use client";
import { MoonLoadingSpinner } from "@/components/shared/loading_banner/moon_loader";
import { getPolitician } from "@/firebase/firestore/storage";
import { Politician } from "@/types";
import React from "react";
import useSWR from "swr";
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
import Link from "next/link";
import { PoliticalCategoryCard } from "./politicians_home";

interface Props {
  politicianId: string;
}

const SinglePolitician: React.FC<Props> = ({ politicianId }) => {
  const {
    data: politician,
    isLoading,
    error,
  } = useSWR<Politician>(`/politicians/${politicianId}`, async () => {
    const politician = await getPolitician(politicianId);
    return politician;
  });

  return (
    <div>
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <MoonLoadingSpinner />
        </div>
      )}
      {politician && (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-[600px]">
            <CardHeader>
              <CardTitle>Politician Details</CardTitle>
              {/* <CardDescription>These are your details</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="flex items-center flex-col">
                <div>
                  <Avatar className="w-40 h-40">
                    <AvatarImage
                      src={
                        politician?.imageUrl ??
                        "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
                      }
                    />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                </div>
                <div className="my-4 flex flex-col gap-2">
                  <div className="flex gap-3">
                    <p className="font-bold text-lg">Name:</p>
                    <p className="text-lg">{politician?.name}</p>
                  </div>
                  <div className="flex gap-2 flex-col">
                    <p className="font-bold text-lg">Description</p>
                    <p className="text-lg">{politician?.description}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap my-3 ">
                    {politician.politicalCategory.map((category, index) => (
                      <PoliticalCategoryCard
                        key={index}
                        category={category.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" asChild>
                <Link href="/politicians">Go Back To Politicians</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      {error && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-center text-2xl font-bold">
            There was an error
            <br /> getting the politician
          </p>
        </div>
      )}
    </div>
  );
};

export default SinglePolitician;
