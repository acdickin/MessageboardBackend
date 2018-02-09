import mongoose from 'mongoose';
const Schema = mongoose.Schema;


export const UserSchema= new Schema({
	firstName:{type:String,required:true},
	lastName:{type:String,required:true},
	email:{type:String,required:true},
	passhash:{type:String },
	created: {type:Date, default:Date.now},
})