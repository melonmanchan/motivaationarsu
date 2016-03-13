import sockets from 'socket.io';

const SOCKET_EVENTS = {
    DISCONNECT              : 'disconnect',
    CONNECTION              : 'connection',
    MOTIVATE                : 'motivate',
    NEW_MOTIVATE            : 'new_motivate',
    MOTIVATOR_AMOUNT_CHANGE : 'motivator_state_change'
};

let currentMotivations = 0;
let currentMotivators  = 0;

function setupSocketIO(server) {
    let io = sockets(server);

    io.on(SOCKET_EVENTS.CONNECTION, socket => {

        socket.emit(SOCKET_EVENTS.MOTIVATE, { currentMotivations: currentMotivations });

        socket.on(SOCKET_EVENTS.NEW_MOTIVATE, payload => {
            currentMotivations++;
            io.emit(SOCKET_EVENTS.NEW_MOTIVATE, { currentMotivations: currentMotivations, sentence: payload.sentence });
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            currentMotivators--;
            io.emit(SOCKET_EVENTS.MOTIVATOR_AMOUNT_CHANGE, { currentMotivators: currentMotivators });
        });

        currentMotivators++;
        io.emit(SOCKET_EVENTS.MOTIVATOR_AMOUNT_CHANGE, { currentMotivators: currentMotivators });
    });

};

export default setupSocketIO;

