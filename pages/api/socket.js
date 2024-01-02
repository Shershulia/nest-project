import { Server } from 'socket.io';

export const config = {
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {

        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', socket => {
            socket.on('message', msg => {
                console.log(msg)
                socket.broadcast.emit('update-input', msg)
            })
        });
    } else {

    }

    res.end();
};

export default ioHandler;
