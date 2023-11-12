import roleService from '../../services/roleService';

let getRoleList=async(req,res)=>{
    try {
        let data=await roleService.getAllRole();
        res.json(data);    } catch (error) {
        console.log(error);
    }
}

let getCreateRolePage=async(req,res)=>{
    try {
        let data=await roleService.getAllPermission()
        res.json(data);    } catch (error) {
        console.log(error);
    }
}

let createNewRole=async(req,res)=>{
    try {
        await roleService.createNewRole(req.body);
        res.redirect('/admin/roleList');
    } catch (error) {
        console.log(error);
    }
}

let getEditRolePage=async(req,res)=>{
    try {
        let data=await roleService.getAllPermission();
        let role=await roleService.getEditRole(req.params.id);
        res.render('admin/role/EditRole',{role:role,data:data});
    } catch (error) {
        console.log(error);
    }
}

let updateRole=async(req,res)=>{
    try {
        await roleService.updateRole(req.params.id,req.body);
        res.redirect('/admin/roleList');
    } catch (error) {
        console.log(error);
    }
}

let deleteRole=async(req,res)=>{
    try {
        await roleService.deleteRole(req.body.id);
        res.redirect('/admin/roleList');
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getRoleList,getCreateRolePage,createNewRole,getEditRolePage,updateRole,deleteRole
}