const Group = require('../models/gruop');
const Post = require('../models/post')
const User = require('../models/userModel')

const getGroupMembers = async(req, res)=>{
    try{
        const {groupId} = req.params
        if (!groupId) throw new Error('no gruop specified');
        const group = await Group.findOne({groupId});
        if (!group) throw new Error('group not found');
        const Members = group.members
        if (!Members) throw new Error('group has no members');
        res.status(200).json({
            msg:'group members found',
            data: Members,
            success:true,
            error: false
        });

    } catch(err) {
        res.status(400).json({
            msg:err.message||err,
            success:false,
            error: true
        })
    }
};

const creategroupMember = async(req, res)=>{
    try{
        const {userId} = req.qeury;
        const {groupId} = req.params;
        if (!userId) throw new Error('no user specified');
        if (!groupId) throw new Error('no group selected')
        const user = await User.findOne({userId});
        if (!user) throw new Error('no user found');
        const group = await Group.findOne({groupId});
        if (!group) throw new Error(' no group found');

        group.push(user.id)
        await group.save()
        res.status(201).json({
            msg:'added a a new member to group',
            data: group,
            success:true,
            error:false
        });

    } catch(err){
        res.status(400).json({
            msg:err.message,
            success:false,
            error: true
        })
    }
};

const deleteGroupMember = async (req, res)=>{
    try{
        const {userId} = req.qeury;
        const {groupId} = req.params;
        if (!userId) throw new Error('no user specified');
        if (!groupId) throw new Error('no group selected')
        const user = await User.findOne({userId});
        if (!user) throw new Error('no user found');
        const group = await Group.fondOne({groupId});
        if (!group) throw new Error(' no group found');

        const newMembers = group.members.filter(usrID=> usrID !== user.id)
        group.members = newMemebers;
        await group.save()
        res.status(201).json({
            msg:'added a a new member to group',
            data: newMembers,
            success:true,
            error:false
        });


    } catch(err){
        res.status(400).json({
            msg:err.message||err,
            success:false,
            error:true
        })
    }
};

module.exports = {
    getGroupMembers,
    creategroupMember,
    deleteGroupMember
}
