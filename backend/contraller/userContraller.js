const mongoose = require('mongoose')
const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')


const SignUp = async (req, res)=>{
    try{
        const { name, email, password } = req.body

        const checkUser = await Users.findOne({email: email});
        if (checkUser) throw new Error('user already exists')

        if (!name)      throw new Error('please enter name');
        if (!email)     throw new Error('please enter your mail');
        if (!password)  throw new Error('please enter password');

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        
        if (!hashedPassword) throw new Error('no hashed password');

        const user = {
            ...req.body,
            password: hashedPassword,
            role: " GENERAL"
        }
        const newUser = new Users(user)
        savedUser = await newUser.save()

        res.status(201).json({
            message: 'user created',
            data: savedUser,
            success: true,
            error: false
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }

}

module.exports = SignUp
