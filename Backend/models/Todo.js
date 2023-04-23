const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    user:{
        type:String
    },
    text:{
        type:String,
    },
    inProgress:{
        type:Boolean,
    },
    done:{
        type:Boolean,
        // required:true,
    },
    position:{
        type:Number
    },
    
    date:{
        type:String,
        // default:Date.now
    }
  });

  module.exports= mongoose.model('todos',todoSchema)