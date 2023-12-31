import {model, Schema,models} from "mongoose";

const NotificationSuggestionSchema = new Schema({
        text:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        }
    },
    {timestamps:true});
export const NotificationSuggestion = models?.NotificationSuggestion
    || model('NotificationSuggestion',NotificationSuggestionSchema)