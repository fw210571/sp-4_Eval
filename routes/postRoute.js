const express = require("express") ;
const jwt = require("jsonwebtoken") ;
const bcrypt = require("bcrypt") ;

const { PostModel } = require("../models/postModel") ;

const postRouter = express.Router() ;

//getting all the post 
postRouter.get("/" , async(req , res )=>{
     const { userID  } = req.body ;
     const query = req.query ;
     let data ;

     try{
          
          if( query ){
               data = await PostModel.find({query}) ;
          }else{
               data = await PostModel.find({userID}) ;
          }
          res.send( {"msg" : data} ) ;
     }catch(err){ 
          res.send( {"msg" : err} ) ;
     }
     
}) ;

// >>> getting top comment
postRouter.get("/top" , async(req , res )=>{
     const { userID  } = req.body ;

     try{
          const data = await PostModel.find({userID}).sort({"no_if_comments":-1}).limit(1) ;
          res.send( {"msg" : data} ) ;

     }catch(err){ 
          res.send( {"msg" : "err"} ) ;
     }
     
}) ;







// >>> posting data

// format 
// {
//      "title" : "IQOO Z3" ,
//      "body"  : "plastic" ,
//      "device"  : "mobile" ,
//      "no_if_comments"  : 10 
//  }

postRouter.post("/" , async(req , res )=>{

     const { title , body , device , no_if_comments , userID  } = req.body ;

     try{
          const data = new PostModel( {  title , body , device , no_if_comments , userID   } ) ;
          await data.save() ;
          res.send( {"msg" : "post added"} ) ;
     }catch(err){ 
          res.send( {"msg" : err} ) ;
     }
     
}) ;



// updating by ID 
postRouter.patch("/:id" , async(req , res )=>{

     const payload = req.body ;
     const ID = req.params.id ;
     try{
          await PostModel.findByIdAndUpdate( {_id : ID } , payload ) ;
          res.send( {"msg" : "post updated"} ) ;
     }catch(err){ 
          res.send( {"msg" : err} ) ;
     }
     
}) ;



// deleting by ID 
postRouter.delete("/:id" , async(req , res )=>{

     const ID = req.params.id ;
     try{
          await PostModel.findByIdAndDelete( {_id : ID } ) ;
          res.send( {"msg" : "post deleted"} ) ;
     }catch(err){ 
          res.send( {"msg" : err} ) ;
     }
     
}) ;


module.exports = { postRouter } ;