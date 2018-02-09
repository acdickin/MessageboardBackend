var config = require('../config');
import jwt  from 'jsonwebtoken'
import mongoose from 'mongoose'
import {UserSchema} from '../models/UserModel'
import bcrypt from 'bcrypt'
const User = mongoose.model('user', UserSchema);
 

export const loginUser=(req, res)=>{

	User.find({email: req.body.email}, (err, docs)=>{
		if (err){
			sendAuthError(res)
		}
		else{
			bcrypt.compare(req.body.password,docs[0].passhash, (err,res)=>{
				if (err){
					sendAuthError(res)
				}
				else{
					sendToken(docs,res)
				}
			}) 	 
		}
	})
}	

export const createUser=(req, res)=>{
	let newUser= new User({
		firstName: req.body.firstName,
  	lastName: req.body.lastName,
		email: req.body.email,
		passhash:""
	})

	bcrypt.hash(req.body.password, 10, (err, hash)=>{
		if (err){
			console.log("error with hash")
		}
		else{
			newUser.passhash =hash
		}
	})

	

	User.find({email: req.body.email}, (err, docs)=>{
		if (docs.length){
			res.json({message:"user already exists"})
		}
		else{
			newUser.save(
				(err)=>{
					if(err){
						
						throw err;
					}
					else{
						newUser
						delete newUser.passhash
						
						sendToken(newUser, res)				
					}
			})	
		}
	})
}

export const authUser=(req, res)=>{
	
	var UserId=req.id;
	User.findById(UserId, (err,user)=>{
		if(err){
			res.send(err);
		}
		res.json(user);
	})
	
}

export const updateUser=(req, res)=>{
	
	var UserId=req.id;
	User.updateOne(
		{_id:UserId}
		,{
			$set:{"firstName" : req.body.firstName, "lastName" : req.body.lastName}
		},
		(err, results)=>{
			if(err){
				throw err
			}
			else{
				res.json(results.result)
				
			}
		}
	)
	res.json(user);
}


function sendToken(user,res){
	var token= jwt.sign(user.id, config.config.secret); 
	res.json({firstName:user.firstName,token});
	
}

function sendAuthError(res){
	return res.json({success:false, message:"email or password incorrect"});
}


export const checkAuthenticated = (req,res,next) =>{
	if(!req.header('authorization')){
		//return res.status(401).send({message: 'Unauthorized request. Missing Authentication Header'})
		console.log('Unauthorized request. Authentication Header invalid')
	}
	
	var token= req.header('authorization').split(" ")[1]
	var payload = jwt.decode(token,config.config.secret)

	if(!payload){
		//return res.status(401).send({message: 'Unauthorized request. Authentication Header invalid'})
		console.log('Unauthorized request. Authentication Header invalid')
	}
	
	req.id=payload;
	next();
}
