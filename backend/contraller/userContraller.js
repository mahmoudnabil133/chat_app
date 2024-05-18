const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')


const SignUp = async (req, res)=>{
    try{
        const { name, email, password } = req.body

        const checkUser = await User.findOne({email: email});
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
        const newUser = new User(user)
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

};

const getUsers = async(req, res)=> {
    try{
        const users = await User.find()
        if (! users) throw new Error('no users founded');
        res.status(200).json({
            data:users,
            success:true,
            error: false
        })
    } catch (err) {
        res.status(404).json({
            msg: err.message || err,
            success: false,
            error: true
        })
    }
}

const getOneUser = async(req, res)=>{
    try{
        const { id } = req.params;
        if (!id) throw new Error('no id geven');
        const user = await  User.findOne({id});
        if (!user) throw new Error('user not found');
        res.status(200).json({
            msg:'user founded',
            data:user,
            success:true,
            error:false
        })
        
    } catch (err) {
        res.status(404).json({
            msg: err.message||err,
            success:false,
            error:true
        })
    }
};


const updateUSer = async(req, res)=>{
    try{
        const { id } = req.params
        if (!id) throw new Error('no id specified');
        const checkUser = await User.findOne({id});
        if (!checkUser) throw new Error('user not found');

        const newData = req.body
        const {userId} = req.body
        if (userId !== id) throw new Error('user already found');
        const updatedUser = await User.findByIdAndUpdate(id, newData, {new:true});
        if (!updatedUser) throw new Error('err while updating group');
        res.status(200).json({
            msg:'user updated successfully',
            data: updatedUser,
            success:true,
            error: false
        })
    } catch(err) {
        res.json({
            msg:err.message||err,
            success:false,
            error: true
        })
    }
};
const deleteUser = async(req, res)=>{
    try{
        const { id } = req.body
        if(!id) throw new Error('no id');
        const user = await User.findOne({id})
        if(!user) throw new Error('no user found to delete')
        await User.findByIdAndDelete(id)
        res.status(200).json({
            msg:'user deletd',
            suceess:true,
            error:false
        })
    } catch(err) {
        res.status(400).json({
            msg:err.message||err,
            success:false,
            error: true
        })
    }
};


module.exports = {
    SignUp,
    getUsers,
    getOneUser,
    updateUSer,
    deleteUser
}
