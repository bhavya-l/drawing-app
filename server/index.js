const http = require('http')
const {WebSocketServer} = require('ws')

const uuidv4 = require('uuid').v4
const url = require('url')

const server = http.createServer()
const wsServer = new WebSocketServer({server})
const port = 8000

const connections = {}
const users = {}

const broadcast = () => {
    Object.keys(connections).forEach(targetUserId => {
        const connection = connections[targetUserId];

        // Create a copy excluding this user's own data
        const others = Object.fromEntries(
            Object.entries(users).filter(([userId]) => userId !== targetUserId)
        );

        connection.send(JSON.stringify(others));
    });
};


const handleMessage = (bytes, userId) => {
    const message = JSON.parse(bytes.toString())
    const user = users[userId]
    user.state = message
    
    broadcast()
}

const handleClose = userId => {
    console.log(`User ${users[userId].username} disconnected`)
    delete connections[userId]
    delete users[userId]

    broadcast()
}

function getRandomColor() {
    const colors = ["#ff4d4d", "#4d94ff", "#4dff4d", "#ffb84d", "#b84dff", "#4dffff", "#ff4da6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

wsServer.on("connection", (connection, request) => {
    const { username } = url.parse(request.url, true).query
    const userId = uuidv4() 

    connections[userId] = connection
 
    users[userId] = {
        username,
        color: getRandomColor(),
        state: {}
    }
    console.log(`User ${users[userId].username} connected`)
    connection.on("message", message => handleMessage(message, userId))
    connection.on("close", () => handleClose(userId))
})

server.listen(port, () => {
    console.log(`Websocket server is running on port ${port}`)
})