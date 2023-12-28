import { FC } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { Button } from "@/components/ui/button";
import Paragraph from "@/components/ui/Paragraph";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 lg:p-16 gap-8">
      <div className="text-center flex gap-4 mb-8">
        <h1 className="text-6xl font-extrabold tracking-tight lg:text-8xl">
          FlashChat
        </h1>
        <ChatIcon sx={{ fontSize: "3.5rem" }} />
      </div>
      <Paragraph className="max-w-xl text-justify">
        Experience fast messaging with the utmost privacy. Sign in with a single
        click, no message storage, ensuring your{" "}
        <span className ="font-bold text-yellow-300"> conversations vanish</span> the moment you disconnect.
      </Paragraph>
      <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 mt-8">
        <Button variant="default" size="lg" className="w-full sm:w-auto">
          Sign In
        </Button>
        <Button variant="subtle" size="lg" className="w-full sm:w-auto">
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
