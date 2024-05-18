const Group = require('../models/gruop');
const Post = require('../models/post')
const User = require('../models/userModel')
const Comment = require('../models/comment');

const getComments = async(req, res)=> {
    try{
        const comments = await Comment.find()
        if (! comments) throw new Error('no comments founded');
        res.status(200).json({
            data:comments,
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
};

const getCommentsForPost = async(req, res)=> {
    try{
        const { postId } = req.query
        if (!postId) throw new Error('no post specified');
        checkPost = await Post.findOne({postId});
        if (!checkGroup) throw new Error('post not found');
        const posts = await Post.find({postId})
        if (! posts) throw new Error('no posts founded');
        res.status(200).json({
            msg: `founded comments for group ${postId}`,
            data:posts,
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
};


const getOneComment = async(req, res)=>{
    try{
        const { id } = req.params;
        if (!id) throw new Error('no id geven');
        const post = await  Post.findOne({id});
        if (! comment) throw new Error('comment not found');
        res.status(200).json({
            msg:'comment founded',
            data:comment,
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

const createcomment = async (req, res)=>{
    try {
        const { userId, content, postId} = req.body
        if (!userId) throw new Error('no user selected');
        if (!postId) throw new Error('no post selected');
        if (!content) throw new Error('no content entered');

        checkUser = await User.findOne({userId})
        if (!checkUser) throw new Error('user not found');

        checkPost = await Post.findOne({postId});
        if (!checkPost) throw new Error('post not founded');

        const comment = new Comment(req.body);
        if (!comment) throw new Error('creating commecnt error');
        const saved_comment = await comment.save();
        res.status(201).json({
            msg:'new comment created',
            data: saved_comment,
            success:true,
            error: false
        })

    }catch (err) {
        res.json({
            msg:err.message||err,
            success:false,
            error: true
        })
    } 
};

const updateComment = async(req, res)=>{
    try{
        const { id } = req.params
        if (!id) throw new Error('no id specified');

        const { userId, postId} = req.body
        if (!userId) throw new Error('no user selected');
        if (!postId) throw new Error('no post selected');

        checkUser = await User.findOne({userId})
        if (!checkUser) throw new Error('user not found');

        checkPost = await Group.findOne({postId});
        if (!checkPost) throw new Error('post not founded');

        newData = req.body
        const updatedCommentt = await Comment.findByIdAndUpdate(id, newData, {new:true});
        if (!updatedCommentt) throw new Error('err while updating commect');
        res.status(200).json({
            msg:'group updated successfully',
            data: updatedCommentt,
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
const deleteComment = async(req, res)=>{
    try{
        const { id } = req.body
        if(!id) throw new Error('no id');
        const comment = await Comment.findOne({id})
        if (!comment) throw new Error('commect not found')
        await Comment.findByIdAndDelete(id)
        res.status(200).json({
            msg:'comment deletd',
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
    getComments,
    getCommentsForPost,
    getOneComment,
    createcomment,
    updateComment,
    deleteComment
};
