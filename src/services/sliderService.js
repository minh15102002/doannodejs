import db from "../models";
import partial from "./partial";

let createNewSlider=async(data,dataImage)=>{
    await db.Slider.create({
        name:data.name,
        description:data.description,
        image:partial.getBase64(dataImage.path)
    })
}

let getAllSlider=async()=>{
    try {
        let data=await db.Slider.findAll({})
        if(data && data.length>0){
            data.map(item=>{
                item.image = `data:image/jpeg;base64,${Buffer.from(item.image, 'base64').toString('binary')}`;
                return item;
            })
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getEditSlider=async(id)=>{
    try {
        let data = await db.Slider.findOne({
            where: { id: id },
            raw: true
        });
        if(data){
            data.image= `data:image/jpeg;base64,${Buffer.from(data.image, 'base64').toString('binary')}`;
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

let updateSlider=async(id,data,sliderImage)=>{
    try {
        let slider=await db.Slider.findOne({
            where:{
                id:id
            },
            raw:false
        })
        if(slider){
            slider.name=data.name;
            slider.description=data.description;
            if(sliderImage){
                slider.image=partial.getBase64(sliderImage.path);
            }
            await slider.save();
        }else{
            slider={}
        }
        return slider;
    } catch (error) {
        console.log(error);
    }
}

let deleteSlider=async(id)=>{
    try {
        let data=await db.Slider.findOne({
            where:{id:id},
            raw:false
        })
        await data.destroy();
    } catch (error) {
        console.log(error);
    }
}

module.exports={createNewSlider,getAllSlider,getEditSlider,updateSlider,deleteSlider
}