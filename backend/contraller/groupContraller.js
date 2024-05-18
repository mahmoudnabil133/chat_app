const Group = require('../models/gruop');
const User = require('../models/userModel')

const getGroups = async(req, res)=> {
    try{
        const groups = await Group.find()
        if (! groups) throw new Error('no groups founded');
        res.status(200).json({
            data:groups,
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

const getOneGroup = async(req, res)=>{
    try{
        const { id } = req.params;
        if (!id) throw new Error('no id geven');
        const group = await  Group.findOne({id});
        if (! group) throw new Error('group not found');
        res.status(200).json({
            msg:'group founded',
            data:group,
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

const createGroup = async (req, res)=>{
    try {
        const { name } = req.body
        if (!name) throw new Error('no name entered');
        const group = new Group(req.body);
        if (!group) throw new Error('creating group error');
        const saved_group = await group.save();
        res.status(201).json({
            msg:'new group created',
            data: saved_group,
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

const updateGroup = async(req, res)=>{
    try{
        const { id } = req.params
        if (!id) throw new Error('no id specified');
        newData = req.body
        const updatedGroup = await Group.findByIdAndUpdate(id, newData, {new:true});
        if (!updatedGroup) throw new Error('err while updating group');
        res.status(200).json({
            msg:'group updated successfully',
            data: updatedGroup,
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
const deleteGroup = async(req, res)=>{
    try{
        const { id } = req.body
        if(!id) throw new Error('no id');
        const group = await Group.findOne({id})
        if(!group) throw new Error('no group found to delete')
        await Group.findByIdAndDelete(id)
        res.status(200).json({
            msg:'group deletd',
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
    getGroups,
    getOneGroup,
    createGroup,
    updateGroup,
    deleteGroup,
};
