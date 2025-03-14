require('dotenv/config')
const express = require('express')
const cors = require('cors')
const session = require('express-session')

const { config } = require('./config/app.config')
const connectDatabase = require('./config/database.config')
const errorHandler = require('./middlewares/errorHandler.middleware')
const { HTTPSTATUS } = require('./config/http.config')
const asyncHandler = require('./middlewares/asyncHandler.middleware')
const { BadRequestException } = require('./utils/appError')
const { ErrorCodeEnum } = require("./enums/error-code.enum");

const passport = require('passport')
const authRoutes = require('./routes/auth.route')
require('./config/passport.config')
const app = express()
const BASE_PATH = config.BASE_PATH

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    session({
        name:'session',
        secret:config.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge:24*60*60*100,
            secure:config.NODE_ENV === 'production',
            httpOnly:true,
            sameSite:'lax'
        }
    })
)
app.use(passport.initialize())
app.use(passport.session())
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
app.use(`${BASE_PATH}/auth`,authRoutes);


app.use(errorHandler)

app.listen(config.PORT,async ()=>{
    console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`)
    await connectDatabase()
})