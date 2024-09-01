import React, { useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import { IoMdSend } from "react-icons/io";
import ChatItem from "../components/Chatitem";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendChatRequest = async (
    message: string
  ): Promise<{ chats: Message[] }> => {
    // Simulating an async request to send the chat message
    const response = await fetch("/chats/new", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  };

  const handleSubmit = async () => {
    const message = inputRef.current?.value as string;
    if (message) {
      console.log("Sending message:", message);
      const newMessage: Message = { role: "user", content: message };

      // Add the user's message to the chat
      setChatMessages((prev) => [...prev, newMessage]);

      // Clear the input field
      inputRef.current!.value = "";

      // Send message to the server and await the response
      try {
        const chatData = await sendChatRequest(message);
        // Add the assistant's response to the chat
        setChatMessages((prev) => [...prev, ...chatData.chats]);
      } catch (error) {
        console.error("Failed to send chat request:", error);
      }

      // Scroll to bottom after updating messages
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [chatMessages]); // Trigger scroll when messages change

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1]?.[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "Work Sans" }}>
            You are talking to Ski-Bot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "Work Sans", my: 4, p: 3 }}>
            You can ask questions related to Knowledge, business, Advice,
            Education, etc. But avoid sharing personal information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": { bgcolor: red.A400 },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.73, xs: 1, sm: 1 },
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontSize: "40px", color: "white", mb: 2 }}
        >
          Model - GPT-3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            alignItems: "center",
            mt: 2,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            style={{
              width: "100%",
              background: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
              flex: 1,
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white" }}>
            <IoMdSend />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
