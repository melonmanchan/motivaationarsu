import sockets from 'socket.io';
import client  from './redis';

const SOCKET_EVENTS = {
    DISCONNECT              : 'disconnect',
    CONNECTION              : 'connection',
    MOTIVATE                : 'motivate',
    NEW_MOTIVATE            : 'new_motivate',
    MOTIVATOR_AMOUNT_CHANGE : 'motivator_state_change'
};

let currentMotivations;
let currentMotivators  = 0;

client.get('currentMotivations', function (err, reply) {
    if (err) {
        console.error(err);
    } else {
        currentMotivations = reply || 0;
    }
});

function setupSocketIO(server) {
    let io = sockets(server);

    io.on(SOCKET_EVENTS.CONNECTION, socket => {

        socket.emit(SOCKET_EVENTS.MOTIVATE, { currentMotivations: currentMotivations });

        socket.on(SOCKET_EVENTS.NEW_MOTIVATE, payload => {
            currentMotivations++;
            client.set('currentMotivations', currentMotivations);
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

