import {model, Schema,models} from "mongoose";

const MeetingDocumentSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    date:{
        type:Date,
        required:true,
    },
    documents:[{
        type: String
    }],
    isDownloadable: Boolean,

});
export const MeetingDocument = models?.MeetingDocument || model('MeetingDocument',MeetingDocumentSchema)