import RoomRepository from "../repositories/RoomRepository";
import { Messsage } from "../types/Type";
import UserConnectionService from "./UserConnectionService";
export default class MessageManager {

    static unsentMessagesMap: Map<string, Messsage[]> = new Map<string, Messsage[]>();



}