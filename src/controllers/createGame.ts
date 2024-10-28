import { IWebSocket } from '../models/models';
import { currentPlayerId, gameCounter, gameInstances, gameParams } from '../store/store';

export const createGame = (id: number, ws: IWebSocket) => {

    const existGameInstance: gameParams = gameInstances.find(game => game.roomId === id) as gameParams;

    if (existGameInstance) {
        existGameInstance.wssockets.push(ws);
        const gameId = id + ':' + existGameInstance.gameCounter;
        existGameInstance.gameCounter++;
        existGameInstance.wssockets.forEach((wssockets, index) => {
            const response = {
                type: 'create_game',
                data: JSON.stringify({
                    idGame: gameId,
                    idPlayer: index,
                }),
                id: 0,
            };
            wssockets.send(JSON.stringify(response));
        });
    } else {
        gameInstances.push({
            roomId: id,
            wssockets: [ws],
            gameCounter,
            currentPlayerId,
            firstPlayerShips: [],
            secondPlayerShips: [],
        });
    }
};