module.exports=(req, res, next)=>{
  if(!req.user){
    //return here will stop cascading chain and return.
    return res.status(401).send({error: 'Log in required!'});
  }
  next();
}