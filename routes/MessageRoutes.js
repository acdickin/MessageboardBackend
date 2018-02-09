import {getAllMessages, getMessagesByUser, createMessage} from '../controllers/MessageController' 
import express from 'express';


const MessageRoutes=(app)=>{

	app.route('/api/messages')
		.get((req, res)=>{
			getAllMessages(req, res)
		})

	app.route('/api/messages/:user')
		.get((req, res)=>{
			 getMessagesByUser(req, res)
		})

	app.route('/api/message')
		.post((req, res)=>{
			createMessage(req, res)
		})
	
}


export default  MessageRoutes;