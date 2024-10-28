import { Rooms } from '../store/store';
import { IWebSocket } from '../models/models';
import { clients } from '../websocket';

export const updateRooms = (ws: IWebSocket) => {
    const response = {
        type: 'update_room',
        data: JSON.stringify(Rooms),
        id: 0,
    };
    clients.forEach((ws) => {
        ws.send(JSON.stringify(response));
    });
};