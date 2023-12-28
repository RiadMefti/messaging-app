import { FC, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import socket from "../socket";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUserStore } from "@/stores/UserStore";
import { User } from "@/types/Type"; // Import User type

const SignIn: FC = () => {
  const [userId, setUserId] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const { setUser } = useUserStore();

  useEffect(() => {
    socket.on("login", (response: User | null) => {
      // Handle the login response
      if (response) {
        // If response is a User object
        setUser(response);
        navigate("/chat");
      } else {
        // If response is null, indicating invalid ID
        setLoginMessage("Invalid ID. Please try again.");
      }
    });
  }, [setUser, navigate]);

  const handleLogin = () => {
    if (userId) {
      socket.emit("login", userId);
    } else {
      setLoginMessage("Please enter a valid ID");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-10 h-screen">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
        Sign In
      </h1>
      <Input
        placeholder="Enter your ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Button disabled={!userId} onClick={handleLogin}>
        Sign In
      </Button>
      {loginMessage && <div className="text-red-600 mt-2">{loginMessage}</div>}
    </div>
  );
};

export default SignIn;
