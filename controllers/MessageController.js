import jwt  from 'jsonwebtoken'
import mongoose from 'mongoose'
import {MessageSchema} from '../models/MessageModel'

const Message = mongoose.model('message', MessageSchema);
 
export const getAllMessages=(req, res)=>{
	Message.find({}, function (err, user) {
   if(err){
			res.send(err);
		}
		res.json(user);
	})		
}
export const getMessagesByUser=(req, res)=>{
	var QueryUser = req.params.user;
	Message.find({user: QueryUser}, function (err, user) {
   if(err){
			res.json({user:"No Posts from that use Name",text:""});
		}
		res.json(user);
	})		
}

export const createMessage=(req, res)=>{
	
	console.log("create user:",req.body)

	let newMessage= new Message({
		user: req.body.user,
		text:req.body.text
	})
	newMessage.save(
		(err)=>{
			if(err){
				console.log("error occured", err)
				throw err;
			}
			else{
				  res.json({
					message:'successful'
				})
			}
	})
}
