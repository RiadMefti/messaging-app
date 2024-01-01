export type UserId = string;
export type ResponseStatus = {
    status: Status;
    message: string;
}

export enum Status {
    ERROR = "ERROR",
    SUCCESS = "SUCCESS"
}

export type NameReturn = {
    id: string;
    name: string;
}
export type Message = {
    message: string;
    room: string;
    sender: string;
    time: string;
}

export type User = {
    id: UserId;
    name: string;


}
export  interface Room {
    roomId: string;
    userName: string;
    hidden: boolean;
}
export type RoomWithOtherPerson={
    room: Room;
    otherPersonneInTheRoom: string;
}