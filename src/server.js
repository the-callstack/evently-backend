'use strict'

const { express } = require("./config")
const { cors, morgan, cookieParser } = require('./config/utils')
const { errorHandler, pageNotFoundHandler } = require("./api/controllers/errorControllers")


const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})


const start = (port) => {
    app.listen(port, (req, res) => {
        console.log(`Diamond City Radio on port  ${port}`)
    })
}

app.get('*', pageNotFoundHandler)

app.use(errorHandler)


module.exports = {
    start,
    app
}