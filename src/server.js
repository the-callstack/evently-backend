'use strict'

const { express } = require("./config")
const { cors, morgan, cookieParser, helmet } = require('./config/utils')
const { errorHandler, pageNotFoundHandler } = require("./api/controllers/errorControllers")
const authRouter = require("./api/routes/User/user.routes")
const { storeRoutes } = require("./api/routes/store/store.routes")
const { saleItemRouter } = require("./api/routes/saleItem/saleItem.routes")
const { rentalItemRouter } = require("./api/routes/rental-items/rentalItem.routes")
const { orderRouter } = require("./api/routes/Order/order.routes")

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(helmet())


app.use(orderRouter)
app.use(storeRoutes)
app.use(rentalItemRouter)
app.use(saleItemRouter)
app.use(authRouter)
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