import sockets from 'socket.io';

const SOCKET_EVENTS = {
    DISCONNECT   : 'disconnect',
    CONNECTION   : 'connection',
    MOTIVATE     : 'motivate',
    NEW_MOTIVATE : 'new_motivate'
};

let currentMotivations = 0;

function setupSocketIO(server) {
    let io = sockets(server);

    io.on(SOCKET_EVENTS.CONNECTION, socket => {
        console.log('New socket connected');

        socket.on(SOCKET_EVENTS.MOTIVATE, () => {
            currentMotivations++;
            io.emit(SOCKET_EVENTS.NEW_MOTIVATE, { currentMotivations: currentMotivations });
        });
    });
};

export default setupSocketIO;

