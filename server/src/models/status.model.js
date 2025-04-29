
import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({

    statusType : {type : String, required: true},

    statusCode : {type : String, required: true}

}, {timestamps : true});

const statusModel = mongoose.model("Status", statusSchema)

export default statusModel

