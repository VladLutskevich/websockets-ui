import { IPlayer, IRequest, IResponse, IWebSocket } from '../models/models';
import { Players, Rooms, mapWsockets } from '../store/store';
import crypto from 'crypto';
import { updateRooms } from './updateRooms';

export const registration = (ws: IWebSocket, request: IRequest) => {

    ws.index = crypto.randomUUID().toString();
    mapWsockets.push(ws);
    const { name, password } = JSON.parse(request.data);
    if (name.length < 5 || password.length < 5) {
        const responseError = {
            type: 'reg',
            data: JSON.stringify({
                error: true,
                errorText: 'Password and name should have a minimum 5 characters',
            }),
            id: 0,
        };
        ws.send(JSON.stringify(responseError));
        return;
    }
    const newPlayer: IPlayer = {
        name: name,
        password: password,
        wins: 0,
        index: ws.index,
    };
    let indexPlayer = Players.findIndex((player) => player.name === newPlayer.name);
    if (indexPlayer === -1) {
        indexPlayer = Players.length - 1;
    }
    const response: IResponse = {
        type: 'reg',
        data: JSON.stringify(
            {
                name,
                indexPlayer,
                error: false,
                errorText: 'error',
            }),
        id: request.id,
    };
    Players.push(newPlayer);
    if (Rooms.length > 0) {
        updateRooms(ws);
    }
    ws.send(JSON.stringify(response));
};