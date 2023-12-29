import Room from "../models/Room";

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
export type Messsage = {
    message: string;
    room : string;
    sender : string;
    time : string;
}

export type RoomWithOtherPerson={
    room: Room;
    otherPersonneInTheRoom: string;
}