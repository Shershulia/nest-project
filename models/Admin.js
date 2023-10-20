import {model, Schema,models} from "mongoose";

const AdminSchema = new Schema({
        email:{
            type:String,
            required:true,
            unique:true
        }
    },
    {timestamps:true});
export const Admin = models?.Admin || model('Admin',AdminSchema)