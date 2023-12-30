import { FC, useEffect, useRef, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUserStore } from "@/stores/UserStore";
import { Message, RoomWithOtherPerson } from "@/types/Type";
import { useRoomStore } from "@/stores/RoomStore";
import socket from "@/socket";
import DeleteIcon from "@mui/icons-material/Delete";

type MessageData = {
  room: string;
  message: Message;
};

const ChatPage: FC = () => {
  const [newChatId, setNewChatId] = useState("");
  const [message, setMessage] = useState("");
  const [isChatSelectorVisible, setIsChatSelectorVisible] = useState(true);
  const { user } = useUserStore();
  const {
    rooms,
    setRooms,
    selectedRoom,
    setSelectedRoom,
    addMessageToRoom,
    initMessagesRoom,
    messages,
  } = useRoomStore();
  const navigate = useNavigate(); // Initialize useNavigate
  const currentUserId = user?.name;

  const createRoom = (otherPersonUsername: string) => {
    socket.emit("createRoom", otherPersonUsername);
  };
  const handleSendMessage = () => {
    if (!message) return;
    const messageObject: Message = {
      sender: currentUserId as string,
      message: message,
      room: selectedRoom?.room.roomId as string,
      time: new Date().toUTCString(),
    };
    sendMessage(selectedRoom?.room.roomId as string, messageObject);
  };
  const initRoomMessages = (rooms: RoomWithOtherPerson[]) => {
    rooms.forEach((room) => {
      initMessagesRoom(room);
    });
  };
  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array includes messages
  const sendMessage = (roomId: string, message: Message) => {
    const data = { room: roomId, message: message } as MessageData;
    socket.emit("sendMessage", data);
    setMessage("");
  };
  const deleteRoom = (roomWithOthjerPerson: RoomWithOtherPerson) => {
    socket.emit("deleteRoom", roomWithOthjerPerson);
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      socket.emit("getRooms");
      socket.on("joinRooms", (rooms) => {
        const roomIds = rooms.map(
          (room: RoomWithOtherPerson) => room.room.roomId
        );
        socket.emit("joinRooms", roomIds);
        setRooms(rooms);
        initRoomMessages(rooms);
      });
      socket.on("receiveMessage", (data: MessageData) => {
        console.log(data);
        addMessageToRoom(data.room, data.message);
      });
    }
    return () => {
      socket.off("joinRooms");
      socket.off("receiveMessage");
    };
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Chat selector (sidebar) */}
      <div
        className={`fixed inset-0 md:inset-y-0 md:left-0 transform ${
          isChatSelectorVisible ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 bg-card p-4 md:w-2/6 w-full overflow-y-auto transition duration-300 ease-in-out z-10 border-r`}
      >
        <button
          className="md:hidden mb-4 py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary"
          onClick={() => setIsChatSelectorVisible(false)}
        >
          Close
        </button>
        <input
          type="text"
          className="w-full mb-4 p-2 border border-input rounded-md bg-background text-foreground"
          placeholder="Enter ID to create chat"
          value={newChatId}
          onChange={(e) => setNewChatId(e.target.value)}
        />
        <button
          className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary"
          onClick={() => {
            /* Create new chat logic */
            createRoom(newChatId);
          }}
        >
          Create Chat
        </button>
        <div
          style={{
            maxHeight: "75vh",
            height: "75vh",
            overflowY: "auto",
            marginTop: "2rem",
          }}
        >
          {" "}
          {rooms?.map((room: RoomWithOtherPerson) => (
            <div
              key={room.room.roomId}
              className={`p-3 cursor-pointer rounded-md  flex justify-between w-full${
                selectedRoom?.room.roomId === room.room.roomId
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              {room.otherPersonneInTheRoom}
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the room selection
                  deleteRoom(room);
                }}
                style={{ cursor: "pointer", float: "right" }}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedRoom ? (
        <div className="flex-1 flex flex-col md:w-4/6 p-6">
          <div className="flex items-center gap-5">
            {" "}
            <div className="md:hidden lg:hidden xl:hidden">
              <KeyboardReturnIcon
                onClick={() => setIsChatSelectorVisible(!isChatSelectorVisible)}
              />
            </div>
            <h2 className="text-xl">
              Chat {selectedRoom.otherPersonneInTheRoom}
            </h2>
          </div>

          <div
            className="flex flex-col space-y-4 p-10"
            style={{
              height: "80vh",
              overflowY: "auto",
            }}
          >
            {/* Display messages for the selected chat */}
            {selectedRoom.room.roomId != null &&
              messages.get(selectedRoom.room.roomId)?.map((message, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 shadow w-4/5 ${
                    message.sender === currentUserId
                      ? "bg-primary text-primary-foreground ml-auto rounded-s-3xl"
                      : "bg-muted text-grey mr-auto rounded-e-3xl"
                  }`}
                >
                  {message.sender !== currentUserId && (
                    <div>
                      {" "}
                      <strong>{message.sender}</strong> <br />
                    </div>
                  )}
                  {message.sender === currentUserId && (
                    <div ref={messagesEndRef}>
                      <strong>{selectedRoom.room.userName}</strong> <br />
                    </div>
                  )}{" "}
                  {message.message}
                </div>
              ))}
          </div>

          {/* Input field */}
          <div className="flex gap-8 mt-10">
            <input
              type="text"
              className="w-full p-2 border border-input rounded-md bg-background text-foreground"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {" "}
          Please select a chat{" "}
          <Button
            className="xl:hidden lg:hidden md:hidden"
            onClick={() => setIsChatSelectorVisible(true)}
          >
            Select
          </Button>
        </div>
      )}
      {/* Main chat content */}
    </div>
  );
};

export default ChatPage;
