import express from 'express'
import routerViews from './routes/views.routes.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/', routerViews )


const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, () => console.log('Running 🏃'))
const io = new Server(httpServer)


//base de datos logica de manejo de los mensajes
const messages = []

io.on('connection', socket => {
    console.log('new socket 😀 (user connected)')
    socket.on('message', data =>{
        console.log(data);
        messages.push(data)
        io.emit('logs', messages)
    })
})