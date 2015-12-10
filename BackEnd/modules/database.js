var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/oma',connectionStatus);

/**
  *Connectuion callback for fail and ok cases
  */
function connectionStatus(err,ok){
    
    if(err){
        
        console.log(err.message);
    }else{
        
        console.log("We are connected!");
    }
}


