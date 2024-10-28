import { Server } from 'ws';
import { IRequest, IWebSocket } from '../models/models';
import { registration } from '../controllers/registration';
import { createRoom } from '../controllers/createRoom';
import { addPlayerToRoomController } from '../controllers/addPlayerToRoom';
import { updateRooms } from '../controllers/updateRooms';
import { startGame } from '../controllers/startGame';
import { attack } from '../controllers/attack';
import { updateWinners } from '../controllers/updateWinners';

const port = 3000;

export const clients = new Set<IWebSocket>();

export const wss = new Server({
  port: port,
});

wss.on('connection', (ws: IWebSocket) => {
  console.log(`Web Socket connected on the ${port} port`);
  clients.add(ws);
  ws.on('message', (msg: string) => {
    const request = JSON.parse(msg);
    managementRequest(ws, request, msg);
  });
  ws.on('close', () => {
    console.log('WebSocket disconnected');
    clients.delete(ws);
  });
  ws.on('error', console.error);
});

export const managementRequest = (ws: IWebSocket, request: IRequest, msg: string) => {
  console.log(request);
  switch (request.type) {
    case 'reg':
      registration(ws, request);
      break;
    case 'update_winners':
      updateWinners();
      break;
    case 'create_room':
      createRoom(ws);
      break;
    case 'update_room':
      updateRooms(ws);
      break;
    case 'add_user_to_room':
      addPlayerToRoomController(ws);
      break;
    case 'add_ships':
      startGame(ws, msg);
      break;
    case 'attack':
      attack(ws, msg);
      break;
    case 'randomAttack':
      attack(ws, msg, true);
      break;
  }
};