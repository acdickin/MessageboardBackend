import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const MessageSchema = new Schema({
	user:{type:String,required:true},
	text:{type:String,required:true},
	created: {type:Date, default:Date.now}
})