import React from "react";
import Markdown from "react-markdown";

type MessagePropsType = {
  text: string;
};

export const UserMessage: React.FC<MessagePropsType> = ({ text }) => {
  return (
    <div className="py-2 px-4 max-w-[80%] break-words] self-end bg-black text-white rounded-2xl my-2">
      {text}
    </div>
  );
};

export const AssistantMessage: React.FC<MessagePropsType> = ({ text }) => {
  return (
    <div className="py-2 px-4 self-start max-w-[80%] break-words] bg-[#efefef] rounded-2xl my-2">
      <Markdown>{text}</Markdown>
    </div>
  );
};
