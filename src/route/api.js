import express from 'express';
import multer from 'multer';
import path from 'path';
import userController from '../controllers/api/apiuserService';
import cartegoryController from '../controllers/api/apicartegoryController';
import menuController from '../controllers/api/apimenuController';
import productController from '../controllers/api/productService';
import sliderController from '../controllers/api/sliderService';
import roleController from '../controllers/api/roleService';
// import orderController from '../services/orderService';
import authorization from '../middleware/authorization';

var appRoot = require('app-root-path');

let router=express.Router();


const apiRoutes=(app)=>{
// // user,admin
    router.post('/register',userController.postRegister);
    router.post('/login',userController.handleLogin);
    router.post('/logout',authorization.checkAuthentication,userController.postLogout)
// // admin
    router.get('/admin/userList',userController.getUserList);
    router.get('/userCreate',userController.getCreateUserPage);
    router.post('/userCreate',userController.createNewUser);
    router.post('/userEdit/:id',userController.updateUser);
    router.post('/userDelete',userController.deleteUser);

    router.get('/admin/cartegoryList',cartegoryController.getAllCartegory);
    router.get('/cartegoryCreate',cartegoryController.getCartegoryList);
    router.post('/cartegoryCreate',cartegoryController.createNewCartegory);
    router.post('/cartegoryEdit/:id',cartegoryController.updateCartegory);
    router.post('/cartegoryDelete',cartegoryController.deleteCartegory);

    router.get('/admin/menuList',menuController.getMenuList);
    router.post('/menuCreate',menuController.createNewMenu);
    router.post('/menuEdit/:id',menuController.updateMenu);
    router.post('/menuDelete',menuController.deleteMenu);

    router.get('/admin/productList',productController.getProductList);
    router.post('/productDelete/:id',productController.deleteProduct);

    router.get('/admin/sliderList',sliderController.getSliderList);
    router.post('/sliderDelete/:id',sliderController.deleteSlider);
    router.get('/sliderEdit/:id',sliderController.getEditSliderPage);

    router.get('/admin/roleList',roleController.getRoleList);
    // router.get('/admin/roleEdit/:id',roleController.getEditRolePage);
    // router.post('/admin/roleEdit/:id',roleController.updateRole);
    // router.post('/admin/roleDelete',roleController.deleteRole);

    // router.get('/OrderList',orderController.getOrderListPage);
    // router.get('/orderDetail/:id',orderController.detailOrder);
    // router.post('/orderDelete',orderController.deleteOrder);

    return app.use('/api',router);
}

module.exports=apiRoutes;