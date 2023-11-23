import {model, Schema,models} from "mongoose";

const EventSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:String,
    date:Date,
    duration:Number,
    contactPerson:String,
    place:String,
    price:Number,
    participants:[{
        type:String,
    }],
    numberOfPeople:Number,
    images:[{
        type: String
    }],

});
export const Event = models?.Event || model('Event',EventSchema)