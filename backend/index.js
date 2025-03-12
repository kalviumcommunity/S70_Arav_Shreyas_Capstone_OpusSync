require('dotenv/config')
const express = require('express')
const cors = require('cors')
const session = require('cookie-session')

const { config } = require('./config/app.config')
const connectDatabase = require('./config/database.config')
const errorHandler = require('./middlewares/errorHandler.middleware')
const { HTTPSTATUS } = require('./config/http.config')
const asyncHandler = require('./middlewares/asyncHandler.middleware')
const { BadRequestException } = require('./utils/appError')
const { ErrorCodeEnum } = require("./enums/error-code.enum");
const app = express()
const BASE_PATH = config.BASE_PATH

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    session({
        name:'session',
        keys:[config.SESSION_SECRET],
        maxAge: 24*60*60*1000,
        secure:config.NODE_ENV === 'production',
        httpOnly:true,
        sameSite:'lax'
    })
)

app.use(
    cors({
        origin:config.FRONTEND_ORIGIN,
        credentials:true,
    })
)

app.get(
    '/',
    asyncHandler(async(req,res,next)=>{
        // throw new BadRequestException(
        //     "This is a bad request",
        //     ErrorCodeEnum.AUTH_INVALID_TOKEN
        // )

        return res.status(HTTPSTATUS.OK).json({
            message:'Everything is fine'
        })
    })
)

app.use(errorHandler)

app.listen(config.PORT,async ()=>{
    console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`)
    await connectDatabase()
})