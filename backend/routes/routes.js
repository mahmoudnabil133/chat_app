const express = require('express')
const router = express.Router()
const  {SignUp, getUsers, getOneUser, updateUSer, deleteUser} = require('../contraller/userContraller')
const  {getGroups, getOneGroup, createGroup, updateGroup, deleteGroup} = require('../contraller/groupContraller')
const  {getPosts, getOnePost, getPostsForGroup,getPostsForUser,  createPost, updatePost, deletePost} = require('../contraller/postContraller')
const  {getComments, getOneComment,getCommentsForPost, createcomment, updateComment, deleteComment }  = require('../contraller/commectContraller');
const  {getGroupMembers, creategroupMember, deleteGroupMember} = require('../contraller/groupMembersContraller')

// user routes
router.get('/users', getUsers);
router.get('/users/:id', getOneUser);
router.post('/signUp', SignUp)
router.put('/users:id', updateUSer)
router.delete('/users/:id', deleteUser)

// group routes
router.get('/groups', getGroups);
router.get('/groups/:id', getOneGroup);
router.post('/groups', createGroup)
router.put('/groups:id', updateGroup)
router.delete('/groups/:id', deleteGroup)

// group members routes
router.get('/groupMembers/:id', getGroupMembers);
router.get('/groupMembers:id', creategroupMember)
router.delete('/groupMembers/:id', deleteGroupMember)

// Post routes
router.get('/posts', getPosts);
router.get('/posts/:id', getOnePost);
router.get('/groupPosts', getPostsForGroup)
router.get('/userPosts', getPostsForUser)
router.post('/posts', createPost)
router.put('/posts:id', updatePost)
router.delete('/posts/:id', deletePost)

// Comment routes
router.get('/comments', getComments);
router.get('/comments/:id', getOneComment);
router.get('/postComments', getCommentsForPost)
router.post('/commecnts', createcomment)
router.put('/comments:id', updateComment)
router.delete('/comments/:id', deleteComment)


module.exports = router
