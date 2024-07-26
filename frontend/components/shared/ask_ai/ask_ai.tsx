"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Bot } from "lucide-react";
import React from "react";
import ChatContent from "./chat_content";
import { DialogTitle } from "@radix-ui/react-dialog";

const AskAi = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="border-2 py-1 px-3 bg-black rounded-lg flex items-center justify-center">
          <div className="flex gap-2 items-center justify-center ">
            <Bot color="white" />
            <span className="font-outfit font-bold text-white">Ask AI</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh]">
        <DialogTitle></DialogTitle>
        <ChatContent />
      </SheetContent>
    </Sheet>
  );
};

export default AskAi;
