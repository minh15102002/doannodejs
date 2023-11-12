import settingService from '../services/settingService';

let getSettingList=async(req,res)=>{
    try {
        let data=await settingService.getAllSetting();
        res.render('admin/setting-admin/SettingList',{data});
    } catch (error) {
        console.log(error);
    }
}

let getCreateSettingPage=async(req,res)=>{
    try {
        res.render('admin/setting-admin/CreateSetting');
    } catch (error) {
        console.log(error);
    }
}

let createNewSetting=async(req,res)=>{
    try {
        await settingService.createNewSetting(req.body);
        res.redirect('/admin/settingList');
    } catch (error) {
        console.log(error);
    }
}

let getEditSettingPage=async(req,res)=>{
    try {
        let setting=await settingService.getEditSetting(req.params.id);
        res.render('admin/setting-admin/EditSetting',{setting});
    } catch (error) {
        console.log(error);
    }
}

let updateSetting=async(req,res)=>{
    try {
        await settingService.updateSetting(req.params.id,req.body);
        res.redirect('/settingList');
    } catch (error) {
        console.log(error);
    }
}

let deleteSetting=async(req,res)=>{
    try {
        await settingService.deleteSetting(req.body.id);
        res.redirect('/admin/settingList');
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getSettingList,getCreateSettingPage,createNewSetting,getEditSettingPage,updateSetting,deleteSetting
}