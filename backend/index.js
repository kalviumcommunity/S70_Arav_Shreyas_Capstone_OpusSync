require('dotenv/config')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { config } = require('./config/app.config')
const connectDatabase = require('./config/database.config')
const errorHandler = require('./middlewares/errorHandler.middleware')
const { HTTPSTATUS } = require('./config/http.config')
const asyncHandler = require('./middlewares/asyncHandler.middleware')
const  BadRequestException  = require('./utils/appError')
const { ErrorCodeEnum } = require("./enums/error-code.enum");

const passport = require('passport')

const authRoutes = require('./routes/auth.route')
const  userRoutes  = require('./routes/user.route')
const workspaceRoutes = require('./routes/workspace.route')
const memberRoutes = require('./routes/member.route')
const projectRoutes = require('./routes/project.route')
const taskRoutes = require('./routes/task.route')
const isAuthenticated = require('./middlewares/isAuthenticated.middleware')


require('./config/passport.config')

const app = express()
const BASE_PATH = config.BASE_PATH

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());



app.use(passport.initialize())

app.use(
    cors({
        origin:config.FRONTEND_ORIGIN,
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
app.use(`${BASE_PATH}/user`,isAuthenticated,userRoutes)
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes);


app.use(errorHandler)

app.listen(config.PORT,async ()=>{
    console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`)
    await connectDatabase()
})