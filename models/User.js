import {model, Schema,models} from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
    //Email verification options : waiting , declined:[reason], accepted, null
    emailVerified:{
        type:String,
        required:true,
    },
    subscription:{
        type:Date,
        required:true,
    },
    });
export const User = models?.User || model('User',UserSchema)