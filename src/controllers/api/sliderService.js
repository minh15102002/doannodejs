import sliderService from '../../services/sliderService';

let getSliderList=async(req,res)=>{
    try {
        let data=await sliderService.getAllSlider();
        res.json(data);    } catch (error) {
        console.log(error);
    }
}

let getCreateSliderPage=async(req,res)=>{
    try {
        res.json(data);    } catch (error) {
        console.log(error);
    }
}

let createNewSlider=async(req,res)=>{
    try {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Vui lòng chọn ảnh');
        }
        await sliderService.createNewSlider(req.body,req.file);
        res.json("tao new slider thanh cong");    } catch (error) {
        console.log(error);
    }
}

let getEditSliderPage=async(req,res)=>{
    try {
        let slider=await sliderService.getEditSlider(req.params.id);
        res.json(slider);    } catch (error) {
        console.log(error);
    }
}

let updateSlider=async(req,res)=>{
    try {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        await sliderService.updateSlider(req.params.id,req.body,req.file);
        res.json("update slider thanh cong");    } catch (error) {
        console.log(error);
    }
}

let deleteSlider=async(req,res)=>{
    try {
        await sliderService.deleteSlider(req.body.id);
        res.json("delete slider thanh cong");    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getSliderList,getCreateSliderPage,createNewSlider,getEditSliderPage,updateSlider,deleteSlider
}