import db from "../models";

let createNewSetting=async(data)=>{
    await db.Setting.create({
        config_key:data.config_key,
        config_value:data.config_value
    })
}

let getAllSetting=async()=>{
    try {
        let data=await db.Setting.findAll({
            raw:true
        })
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getEditSetting=async(id)=>{
    try {
        let data = await db.Setting.findOne({
            where: { id: id },
            raw: true
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

let updateSetting=async(id,data)=>{
    try {
        let setting=await db.Setting.findOne({
            where:{
                id:id
            },
            raw:false
        })
        if(setting){
            setting.config_key=data.config_key;
            setting.config_value=data.config_value;
            await setting.save();
        }else{
            setting={}
        }
        return setting;
    } catch (error) {
        console.log(error);
    }
}

let deleteSetting=async(id)=>{
    try {
        let data=await db.Setting.findOne({
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

module.exports={createNewSetting,getAllSetting,getEditSetting,updateSetting,deleteSetting}