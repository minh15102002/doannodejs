import db from "../models";

let getAllRole=async()=>{
    try {
        let data=db.Role.findAll({});
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getAllPermission=()=>{
    try {
        let data=db.Permission.findAll({});
        return data;
    } catch (error) {
        console.log(error);
    }
}

let createNewRole=async(data)=>{
    await db.Role.create({
        name:data.name,
        email:data.email,
        password:hashPassword(data.password),
        role_id:data.role_id
    })
}

let getEditRole=async(id)=>{
    try {
        let data = await db.Role.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password']
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

let updateRole=async(id,data)=>{
    try {
        let role=await db.Role.findOne({
            where:{
                id:id
            },
            raw:false
        })
        if(role){
            role.name=data.name;
            role.email=data.email;
            role.role_id=data.role_id;
            await role.save();
        }else{
            role={}
        }
        return role;
    } catch (error) {
        console.log(error);
    }
}

let deleteRole=async(id)=>{
    try {
        let data=await db.Role.findOne({
            where:{id:id},
            raw:false
        })
        if(data){
            await data.destroy();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={createNewRole,getAllPermission,getAllRole,getEditRole,updateRole,deleteRole,getAllRole}