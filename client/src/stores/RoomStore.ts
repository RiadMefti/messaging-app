import { Room, Message } from "@/types/Type";
import { create } from "zustand";

type roomId = string;
type RoomStoreState = {
    rooms: Room[] | null;
    selectedRoom: Room | null;
    setRooms: (rooms: Room[]) => void;
    setSelectedRoom: (room: Room) => void;
    messages: Map<roomId, Message[]>;
    initMessagesRoom: (room: Room) => void;
    addMessageToRoom: (roomId: string, message: Message) => void;

};

export const useRoomStore = create<RoomStoreState>((set) => ({

    rooms: null,
    selectedRoom: null,
    messages: new Map(),
    setRooms: (rooms: Room[]) => set({ rooms }),
    setSelectedRoom: (room: Room) => set({ selectedRoom: room }),


    initMessagesRoom: (room: Room) => {
        const roomId = room.roomId;

        set((state) => {
            // Create a new Map with the same entries as the existing messages Map
            const newMessages = new Map(state.messages.entries());

            // Add the new room and its messages to the new Map
            newMessages.set(roomId, []);

            // Return the new Map as the new state
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