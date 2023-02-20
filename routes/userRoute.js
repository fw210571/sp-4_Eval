const express = require("express") ;
const jwt = require("jsonwebtoken") ;
const bcrypt = require("bcrypt") ;

const { UserModel } = require("../models/userModel") ;



const userRouter = express.Router() ;

userRouter.get("/" , async(req , res )=>{
     res.send( {"msg" : "users data"} ) ;
}) ;


// >>> registering user

// stucture for register 
// {
//     "name" :     "Harsh" ,
//     "email" :    "H@gmail.com" ,
//     "gender" :   "male" ,
//     "password" : "h123" ,
//     "age" :       24 ,
//     "city" :     "Delhi" 
// }


userRouter.post("/register" , async(req , res )=>{
        
        const { name , email , gender , password , age , city } = req.body ;
        const user = await UserModel.findOne({email}) ;

        try{
            if( user ){
                res.send({"msg" : "User already exist, please login"})
            }else{
                bcrypt.hash(password, 3 , async(err, password) => {
                    // Store hash in your password DB.
                    if( err ){
                        res.send( {"msg" : err} ) ;
                    }else{
                        const data = new UserModel( { name , email , gender , password , age , city } ) ;
                        await data.save() ;
                        res.send( {"msg" : "register successfully"} ) ;
                    }
                    
                });
            }
         

        }catch(err){
            res.send( {"msg" : err} ) ;
        }

    // res.send( {"msg" : "users data"} ) ;
}) ;



// >>> login user 
userRouter.post("/login" , async(req , res )=>{
        
    const {  email ,password } = req.body ;
    const user = await UserModel.findOne({email}) ;

    try{
        if( user ){
            // check password
            bcrypt.compare(password , user.password , (err ,result)=>{
                if( err) {
                    res.send( {"msg" : err } ) ;

                }else{
                   let token =  jwt.sign( { userID :  `${user._id}` } , "linked" ) ;
                    if( token ){
                        res.send( {"msg" : "login successfully" , "token" : token } ) ;
                    }
                }
            })

        }else{
            res.send({"msg" : "enter correct email please"})
        }
     

    }catch(err){
        res.send( {"msg" : err} ) ;
    }

// res.send( {"msg" : "users data"} ) ;
}) ;


module.exports = { userRouter } ;
