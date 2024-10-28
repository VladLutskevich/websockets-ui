import { gameParams, IPlayer, IRoom, IWebSocket } from '../models/models';

export const Rooms: IRoom[] = [];
export const Players: IPlayer[] = [];
export const mapWsockets: IWebSocket[] = [];
export const gameInstances: gameParams[] = [];
export const wssockets: IWebSocket[] = [];
export const roomId: number = 0;
export const gameCounter: number = 0;
export const currentPlayerId: number = 0;