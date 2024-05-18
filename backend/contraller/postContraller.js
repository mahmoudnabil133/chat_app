const Group = require('../models/gruop');
const Post = require('../models/post')
const User = require('../models/userModel')


const getPosts = async(req, res)=> {
    try{
        const posts = await Post.find()
        if (! posts) throw new Error('no posts founded');
        res.status(200).json({
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

const getPostsForGroup = async(req, res)=> {
    try{
        const { groupId } = req.query
        if (!gruopId) throw new Error('no group specified');
        checkGroup = await Group.findOne({groupId});
        if (!checkGroup) throw new Error('group not found');
        const posts = await Post.find({groupId})
        if (! posts) throw new Error('no posts founded');
        res.status(200).json({
            msg: `founded data for group ${groupId}`,
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

const getPostsForUser = async(req, res)=>{
    try {
        const { userId } = req.ruery
        if (!userId) throw new Error('no user entered');
        const checkUser = await User.findOne({userId});
        if (!checkUser) throw new Error('user not found');

        const posts = await Post.find({userId})
        if(!posts) throw new Error(`no posts found for user ${userId}`);
        res.status(200).json({
            msg:`posts found for user ${userId}`,
            data: posts,
            success:true,
            error:false
        })
    } catch(err) {
        res.status(400).json({
            msg:err.message || err,
            success: false,
            error: true
        })
    }
}

const getOnePost = async(req, res)=>{
    try{
        const { id } = req.params;
        if (!id) throw new Error('no id geven');
        const post = await  Post.findOne({id});
        if (! post) throw new Error('post not found');
        res.status(200).json({
            msg:'group founded',
            data:post,
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

const createPost = async (req, res)=>{
    try {
        const { userId, content, groupId} = req.body
        if (!userId) throw new Error('no user selected');
        if (!groupId) throw new Error('no group selected');
        if (!content) throw new Error('no content entered');

        checkUser = await User.findOne({userId})
        if (!checkUser) throw new Error('user not found');

        checkGroup = await Group.findOne({groupId});
        if (!checkGroup) throw new Error('group not founded');

        const post = new Post(req.body);
        if (!post) throw new Error('creating post error');
        const saved_post = await post.save();
        res.status(201).json({
            msg:'new post created',
            data: saved_post,
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

const updatePost = async(req, res)=>{
    try{
        const { id } = req.params
        if (!id) throw new Error('no id specified');

        const { userId, groupId} = req.body
        if (!userId) throw new Error('no user selected');
        if (!groupId) throw new Error('no group selected');

        checkUser = await User.findOne({userId})
        if (!checkUser) throw new Error('user not found');

        checkGroup = await Group.findOne({groupId});
        if (!checkGroup) throw new Error('group not founded');

        newData = req.body
        const updatedPost = await Post.findByIdAndUpdate(id, newData, {new:true});
        if (!updatedPost) throw new Error('err while updating post');
        res.status(200).json({
            msg:'group updated successfully',
            data: updatedPost,
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
const deletePost = async(req, res)=>{
    try{
        const { id } = req.body
        if(!id) throw new Error('no id');
        const post = await Post.findOne({id})
        if (!post) throw new Error('post not found')
        await Post.findByIdAndDelete(id)
        res.status(200).json({
            msg:'post deletd',
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
    getPosts,
    getOnePost,
    getPostsForGroup,
    getPostsForUser,
    createPost,
    updatePost,
    deletePost
};
