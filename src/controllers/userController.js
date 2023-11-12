import userService from '../services/userService';
import db from "../models";
var bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const getLoginPage=(req,res)=>{
    res.render('login');
}
let hashPassword=(password)=>{
    try {
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
}
const handleLogin=async(req,res)=>{
    try {
        let data=await userService.handleLogin(req.body);
        if(!data){
            req.session.isError=true;
            res.redirect('login');
        }else{  
            req.session.isAuthenticated=true;
            req.session.isError=false;
            req.session.authUser=data;
            res.cookie("user_id", data.id);
            // res.redirect('/admin/cartegoryList');
            if (data.role_id === "R1") {
                res.redirect('/');
              }  else {
                res.redirect('/admin/cartegoryList');
              }
        }
    } catch (error) {
        console.log(error);
    }
}


const postLogout=(req,res)=>{
    req.session.isAuthenticated=false;
    req.session.authUser=null;
    res.clearCookie("user_id");
    res.redirect('/login')
}

const getRegisterPage=(req,res)=>{
    res.render('register');
}

const postRegister = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password || !req.body.name) {
        req.session.isError = true;
        return res.redirect('/register');
      } else {
        let user = await db.User.findOne({
          where: { email: req.body.email }
        });
        if (user) {
          req.session.isError = true;
          return res.redirect('/register');
        } else {
          await db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword(req.body.password),
            role_id: req.body.role_id ? req.body.role_id : 'R1'
          });
          return res.redirect('/login');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

const getCreateUserPage=async(req,res)=>{
    try {
        let data=await userService.getAllRole();
        res.render('admin/user/CreateUser',{data});
    } catch (error) {
        console.log(error);
    }
}

const getUserList=async(req,res)=>{
    try {
        let data=await userService.getAllUser();
        res.render('admin/user/UserList',{data});
    } catch (error) {
        console.log(error);
    }
}

const createNewUser=async(req,res)=>{
    try {
        await userService.createNewUser(req.body);
        res.redirect('/userList');
    } catch (error) {
        console.log(error);
    }
}

const getEditUserPage=async(req,res)=>{
    try {
        let role=await userService.getAllRole();
        let user=await userService.getEditUser(req.params.id);
        res.render('admin/user/EditUser',{user,role});
    } catch (error) {
        console.log(error);
    }
}

const updateUser=async(req,res)=>{
    try {
        await userService.updateUser(req.params.id,req.body);
        res.redirect('/userList');
    } catch (error) {
        console.log(error);
    }
}

const deleteUser=async(req,res)=>{
    try {
        await userService.deleteUser(req.body.id);
        res.redirect('/userList');
    } catch (error) {
        console.log(error);
    }
}

module.exports={getLoginPage,handleLogin,getCreateUserPage,postRegister,getUserList,createNewUser,getEditUserPage,
    updateUser,deleteUser,getRegisterPage,postLogout}