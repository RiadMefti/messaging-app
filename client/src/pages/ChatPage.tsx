import { FC, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Button } from "@/components/ui/button";
interface Chat {
  id: number;
  name: string;
}
interface ChatMessages {
  [key: number]: Message[];
}

interface Message {
  id: number;
  text: string;
  sender: string;
}
const ChatPage: FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newChatId, setNewChatId] = useState("");
  const [message, setMessage] = useState("");
  const [isChatSelectorVisible, setIsChatSelectorVisible] = useState(true);

  const currentUserId = "User1";
  const chats: Chat[] = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    { id: 2, name: "Chat 2" },
    // ... more chats
  ];
  const changeChat = (id: number) => {
    setIsChatSelectorVisible(false);
    setSelectedChat(id);
  };
  const [chatMessages, setChatMessages] = useState<ChatMessages>({
    1: [
      { id: 1, text: "Hello there!", sender: "User1" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
      { id: 2, text: "How are you?", sender: "User2" },
    ],
    2: [
      { id: 1, text: "Hey, what's up?", sender: "User3" },
      { id: 2, text: "Not much, you?", sender: "User4" },
      // ... more messages for Chat 2
    ],
    // ... more chats with their messages
  });

  const handleSendMessage = () => {
    if(!message) return;
    if (selectedChat != null) {
      const newMessage: Message = {
        id: Date.now(), // simplistic approach for unique ID
        text: message,
        sender: currentUserId,
      };

      setChatMessages({
        ...chatMessages,
        [selectedChat]: [newMessage, ...chatMessages[selectedChat]],
      });

      setMessage("");
    }
  };

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
          }}
        >
          Create Chat
        </button>
        <div
          style={{ maxHeight: "75vh", overflowY: "scroll", marginTop: "2rem" }}
        >
          {" "}
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 cursor-pointer rounded-md ${
                selectedChat === chat.id
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }`}
              onClick={() => changeChat(chat.id)}
            >
              {chat.name}
            </div>
          ))}
        </div>
      </div>
      {selectedChat ? (
        <div className="flex-1 flex flex-col md:w-4/6 p-6">
          <div className="flex items-center gap-5">
            {" "}
            <div className="md:hidden lg:hidden xl:hidden">
              <KeyboardReturnIcon
                onClick={() => setIsChatSelectorVisible(!isChatSelectorVisible)}
              />
            </div>
            <h2 className="text-xl">Chat {selectedChat}</h2>
          </div>

          <div
            className="flex flex-col-reverse space-y-4 p-10 space-y-reverse"
            style={{
              maxHeight: "80vh",
              minHeight: "80vh",
              overflowY: "scroll",
            }}
          >
            {/* Display messages for the selected chat */}
            {selectedChat != null &&
              chatMessages[selectedChat]?.map((message, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 shadow w-4/5 ${
                    message.sender === currentUserId
                      ? "bg-primary text-primary-foreground ml-auto rounded-s-3xl"
                      : "bg-muted text-muted-foreground mr-auto rounded-e-3xl"
                  }`}
                >
                  {message.sender !== currentUserId && (
                    <strong>{message.sender}:</strong>
                  )}
                  {message.text}
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
          <Button onClick={() => setIsChatSelectorVisible(true)}>Select</Button>
        </div>
      )}
      {/* Main chat content */}
    </div>
  );
};

export default ChatPage;
