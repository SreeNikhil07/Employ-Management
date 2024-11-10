const Listing = require("./models/listing.js");
const ExpressErrors = require("./utils/ExpressErros.js");
const { listingSchema} = require("./schema.js");


module.exports.isLoggedin = (req , res, next) => {
    if(!req.isAuthenticated()){
        //redirect info
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must login to create employee!");
        return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl = (req,res,next) =>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl
  }
  next();
};


module.exports.validateListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body); 
  
  if (error) {
    let errMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressErrors(400, result,errMsg)
    
  }else{
    next();
  }
};


