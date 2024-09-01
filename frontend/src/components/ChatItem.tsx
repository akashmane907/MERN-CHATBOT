import React from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Avatar, Typography } from "@mui/material";

interface ChatItemProps {
  content: string;
  role: "user" | "assistant" | "system"; // Include "system" in role type
}

const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const auth = useAuth();
  const userNameInitials = auth?.user?.name
    ? auth.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "UN"; // Fallback initials if user name is not available

  if (role === "system") {
    return (
      <Box sx={{ display: "flex", p: 2, bgcolor: "#f0f0f0", my: 2 }}>
        <Box>
          <Typography fontSize={"20px"} color={"#333"}>
            {content}
          </Typography>
        </Box>
      </Box>
    );
  }

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="logo.png" alt="logo" width={"30px"} />
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {userNameInitials}
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
