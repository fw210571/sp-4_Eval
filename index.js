const express = require("express") ;
const cors = require("cors") ;
require("dotenv").config() ;
const {connection} = require("./configs/db") ;
const {userRouter} = require("./routes/userRoute") ;
const {postRouter} = require("./routes/postRoute") ;
const {authentication} = require("./middleware/auth") ;

const app = express() ;
app.use(express.json()) ;
app.use(cors()) ;
app.get("/" , (req , res)=>{
    res.send( "welcome to LinkedIn Backend" ) ;
}) ;

app.use("/users" , userRouter ) ;
app.use(authentication) ;
app.use("/posts" , postRouter ) ;

app.listen( process.env.port , async()=>{
    try{
        await connection ;
        console.log("connected to DB") ;
    }catch(err){
        console.log("unable to connect with DB")
    }
    console.log(`running server on port ( ${process.env.port} )`) ;

}  )