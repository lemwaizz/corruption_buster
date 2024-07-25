"use client";
import React, { useEffect } from "react";
import io from "socket.io-client";
const API_URL = "http://localhost:3000/corruption";

const socket = io(API_URL, { autoConnect: false });
const SocketModal = () => {
  useEffect(() => {
    console.log("Socket");
    if (socket.connected) return;
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("join_room", { room: "session.data?.user?.email" });
    });
    socket.on(
      "payment_response",
      (response: { success: boolean; message: string }) => {
        if (response.success) {
          console.log("Payment successful");
          //  setPaymentState("success");
        } else if (response.success === false) {
          console.log("Payment Unsuccesful");
          //  setPaymentState("failed");
        }
      }
    );
    return () => {
      console.log("Disconnecting from socket");
      socket.disconnect();
    };
  }, []);

  return <div>SocketModal</div>;
};

export default SocketModal;
