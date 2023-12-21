export type UserId = string | number;
export type ResponseStatus = {
    status: Status;
    message: string;
}

export enum Status {
    ERROR = "ERROR",
    SUCCESS = "SUCCESS"
}