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
