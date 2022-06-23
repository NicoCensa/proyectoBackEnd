const express = require('express')
const cartRouter = require('./router/cartRouter')
const productRouter = require('./router/productRouter')
const http = require('http');
const { Server } = require('socket.io');
const {Router} = express;

const app = express()
const server = http.createServer(app);
const io = new Server(server);


app.use('/static', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

io.on('connection', socket => {
    console.log(new Date().toLocaleTimeString(), `User connected, id: ${socket.id}`);
    socket.emit('messages', messages);

    socket.on("add", product=>{
        data.push(product);
        io.sockets.emit('show', 'new data');
    })
})

server.listen(8080, () =>{
    console.log('Server running...')
})
server.on('error', e=>{
    console.log('Error on server', e)
})