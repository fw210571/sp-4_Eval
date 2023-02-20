const jwt = require("jsonwebtoken") ;

const authentication = ( req , res , next  )=>{
  let token = req.headers.authentication ;

  if( token ){
    let decode =  jwt.decode( token , "linked" ) ;
    req.body.userID = decode.userID ;
    next() ;
    
  }else{
    res.send( {"msg" : "missing token"} )
  }
  
}


module.exports = { authentication } ;