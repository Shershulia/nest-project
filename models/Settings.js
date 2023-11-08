import {model, Schema,models} from "mongoose";

const SettingsSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    value:{
        type:Object,
    },

});
export const Settings = models?.Settings || model('Settings',SettingsSchema)