import db from "../models";
import partial from "./partial";

let getMenuList=async()=>{
    try {
        let data=await db.Menu.findAll({
            raw:true
        });
        partial.recurse(data,0,'');
        return data;
    } catch (error) {
        console.log(error)
    }
}

let createNewMenu=async(data)=>{
    await db.Menu.create({
        name:data.name,
        parent_id:data.parent_id
    })
}

let getAllMenu=async()=>{
    try {
        let data=await db.Menu.findAll({
            raw:true
        })
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getEditMenu=async(id)=>{
    try {
        let data = await db.Menu.findOne({
            where: { id: id },
            raw: true
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

let updateMenu=async(id,data)=>{
    try {
        let menu=await db.Menu.findOne({
            where:{
                id:id
            },
            raw:false
        })
        if(menu){
            menu.name=data.name;
            menu.parent_id=data.parent_id;
            await menu.save();
        }else{
            menu={}
        }
        return menu;
    } catch (error) {
        console.log(error);
    }
}

let deleteMenu=async(id)=>{
    try {
        let data=await db.Menu.findOne({
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

module.exports={createNewMenu,getAllMenu,getEditMenu,updateMenu,deleteMenu,
    getMenuList
}