import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useEffect, useState } from "react";
import socket from "../socket";
import { User } from "@/types/Type";
import { useUserStore } from "@/stores/UserStore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp: FC = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const { setUser, user } = useUserStore();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    socket.on("register", (user: User) => {
      setUser(user);
      setMessage(
        `Your ID is ${user.id}. Keep it safe as it cannot be retrieved if lost.`
      );
    });

    // Cleanup function
    return () => {
      socket.off("register");
    };
  }, []);

  const submitUsername = () => {
    socket.emit("register", username);
  };
  

  const handleOkClick = () => {
    // Emit login event with user ID
    socket.emit("login", user?.id);
    // Navigate to /chat
    navigate("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-10 h-screen">
      {!user?.id ? (
        <>
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
            Create a Username
          </h1>
          <Input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Button disabled={username.length <= 0} onClick={submitUsername}>
            Submit
          </Button>
        </>
      ) : (
        <>
          <div className="mt-4 text-center text-lg">
            Your ID is{" "}
            <span className="font-bold text-yellow-300">{user.id}.</span> Keep
            it safe as it cannot be retrieved if lost. Your username is also{" "}
            <span className="font-bold text-yellow-300">{user.name}</span> give
            this to people you want to chat with so they can add you
          </div>
          <Button onClick={handleOkClick}>OK</Button>
        </>
      )}
    </div>
  );
};

export default SignUp;
