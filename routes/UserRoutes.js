import { loginUser, createUser, authUser, updateUser, checkAuthenticated } from '../controllers/UserController';
import express from 'express';


 const UserRoutes=(app)=>{
	
	app.route('/auth/login')
		.post((req, res)=>{
			console.log(req.body)
			loginUser(req,res);
		})

	
	app.route('/auth/register')
		.post((req, res)=>{
			createUser(req, res);
		})

	app.route('/api/users/me')
		.get(checkAuthenticated, (req,res)=>{
			authUser(req,res);
		})

	app.route('/api/users/me')
		.post(checkAuthenticated, (req,res)=>{
			updateUser(req, res);
		})

}
export default UserRoutes