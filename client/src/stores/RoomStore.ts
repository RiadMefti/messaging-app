import { Room, Message, RoomWithOtherPerson } from "@/types/Type";
import { create } from "zustand";

type roomId = string;
type RoomStoreState = {
    rooms: RoomWithOtherPerson[] | null;
    selectedRoom: RoomWithOtherPerson | null;
    setRooms: (rooms: RoomWithOtherPerson[]) => void;
    setSelectedRoom: (room: RoomWithOtherPerson) => void;
    messages: Map<roomId, Message[]>;
    initMessagesRoom: (room: RoomWithOtherPerson) => void;
    addMessageToRoom: (roomId: string, message: Message) => void;

};

export const useRoomStore = create<RoomStoreState>((set) => ({

    rooms: null,
    selectedRoom: null,
    messages: new Map(),
    setRooms: (rooms: RoomWithOtherPerson[]) => set({ rooms }),
    setSelectedRoom: (room: RoomWithOtherPerson) => set({ selectedRoom: room }),


    initMessagesRoom: (room: RoomWithOtherPerson) => {
        set((state) => {
            // Create a new Map with the same entries as the existing messages Map
            const newMessages = new Map(state.messages.entries());

            // Only initialize the messages for the room if they haven't been initialized yet
            if (!newMessages.has(room.room.roomId)) {
                newMessages.set(room.room.roomId, []);
            }

            return {
                messages: newMessages
            };
        });
    }
    ,
    addMessageToRoom: (roomId: string, message: Message) => {


        set((state) => {
            // Create a new Map with the same entries as the existing messages Map
            const newMessages = new Map(state.messages.entries());

            // Add the new message to the room's messages
            const roomMessages = newMessages.get(roomId);
            if (roomMessages) {
                roomMessages.push(message);
            }

            // Return the new Map as the new state
            return {
                messages: newMessages
            };
        });
    }
}));