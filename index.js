const express =require("express")
const { connection } = require("./Config/db")
require('dotenv').config()
const cors =require("cors")
const { userRouter } = require("./Routes/userRoute")
const { PostsRouter } = require("./Routes/postRoutes")
const { authenticator } = require("./Middlewares/authenticator")
const app =express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)

app.use(authenticator)

app.use("/posts",PostsRouter)
app.listen(process.env.PORT, async()=>{
  try  {
        await connection
        console.log("connected to database")
    }catch(er){
        console.log(er)
    }

    console.log("server is running on Port",process.env.PORT)
})