import express from 'express';
import multer from 'multer';
import path from 'path';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import cartegoryController from '../controllers/cartegoryController';
import menuController from '../controllers/menuController';
import productController from '../controllers/productController';
import sliderController from '../controllers/sliderController';
import settingController from '../controllers/settingController';
import roleController from '../controllers/roleController';
import orderController from '../controllers/orderController';
import authorization from '../middleware/authorization';

var appRoot = require('app-root-path');

let router=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoutes=(app)=>{
    // user
    router.get("/",homeController.getHomePage);
    router.get("/cart",homeController.getCartShopPage);
    router.get('/payShopPage',homeController.getPayShopPage);
    router.post('/payToCart',homeController.payToCart);
// user,admin
    router.get('/register',userController.getRegisterPage);
    router.post('/register',userController.postRegister);
    router.get('/login',authorization.checkAuthentication,userController.getLoginPage);
    router.post('/login',userController.handleLogin);
    router.post('/logout',authorization.checkAuthentication,userController.postLogout)
// admin
    router.get('/admin/userList',authorization.checkPerformission,userController.getUserList);
    router.get('/userCreate',authorization.checkPerformission,userController.getCreateUserPage);
    router.post('/userCreate',authorization.checkPerformission,userController.createNewUser);
    router.get('/userEdit/:id',authorization.checkPerformission,userController.getEditUserPage);
    router.post('/userEdit/:id',authorization.checkPerformission,userController.updateUser);
    router.post('/userDelete',authorization.checkPerformission,userController.deleteUser);

    router.get('/admin/cartegoryList',authorization.checkPerformission,cartegoryController.getCartegoryList);
    router.get('/cartegoryCreate',authorization.checkPerformission,cartegoryController.getCreateCartegoryPage);
    router.post('/cartegoryCreate',authorization.checkPerformission,cartegoryController.createNewCartegory);
    router.get('/cartegoryEdit/:id',authorization.checkPerformission,cartegoryController.getEditCartegoryPage);
    router.post('/cartegoryEdit/:id',authorization.checkPerformission,cartegoryController.updateCartegory);
    router.post('/cartegoryDelete',authorization.checkPerformission,cartegoryController.deleteCartegory);

    router.get('/admin/menuList',authorization.checkPerformission,menuController.getMenuList);
    router.get('/menuCreate',authorization.checkPerformission,menuController.getCreateMenuPage);
    router.post('/menuCreate',authorization.checkPerformission,menuController.createNewMenu);
    router.get('/menuEdit/:id',authorization.checkPerformission,menuController.getEditMenuPage);
    router.post('/menuEdit/:id',authorization.checkPerformission,menuController.updateMenu);
    router.post('/menuDelete',menuController.deleteMenu);

    router.get('/admin/productList',authorization.checkPerformission,productController.getProductList);
    router.get('/productCreate',authorization.checkPerformission,productController.getCreateProductPage);
    router.post('/productCreate',upload.fields([
        {name:'image_details', maxCount:5},
        {name:"feature_image"}
    ]),
    productController.createNewProduct);
    router.get('/productEdit/:id',authorization.checkPerformission,productController.getEditProductPage);
    router.post('/productEdit/:id',upload.fields([
        {name:'image_details', maxCount:5},
        {name:"feature_image"}
    ]),productController.updateProduct);
    router.post('/productDelete',productController.deleteProduct);
    router.get('/getDetailProductShop/:id',productController.getDetailProductShop)

    router.get('/admin/sliderList',authorization.checkPerformission,sliderController.getSliderList);
    router.get('/sliderCreate',authorization.checkPerformission,sliderController.getCreateSliderPage);
    router.post('/sliderDelete',authorization.checkPerformission,sliderController.deleteSlider);
    router.post('/sliderCreate',authorization.checkPerformission,upload.single('slider_image'),sliderController.createNewSlider);
    router.get('/sliderEdit/:id',authorization.checkPerformission,sliderController.getEditSliderPage);
    router.post('/sliderEdit/:id',authorization.checkPerformission,upload.single('slider_image'),sliderController.updateSlider);

    router.get('/admin/settingList',authorization.checkPerformission,settingController.getSettingList);
    router.get('/settingCreate',authorization.checkPerformission,settingController.getCreateSettingPage);
    router.post('/settingDelete',authorization.checkPerformission,settingController.deleteSetting);
    router.post('/settingCreate',authorization.checkPerformission,settingController.createNewSetting);
    router.get('/settingEdit/:id',authorization.checkPerformission,settingController.getEditSettingPage);
    router.post('/settingEdit/:id',authorization.checkPerformission,settingController.updateSetting);

    router.get('/admin/roleList',authorization.checkPerformission,roleController.getRoleList);
    router.get('/admin/roleEdit/:id',authorization.checkPerformission,roleController.getEditRolePage);
    router.post('/admin/roleEdit/:id',authorization.checkPerformission,roleController.updateRole);
    router.post('/admin/roleDelete',authorization.checkPerformission,roleController.deleteRole);

    router.post('/addToCart/:id',orderController.addToCart);
    router.get('/updateToCart/:id',orderController.updateToCart);
    router.post('/deleteToCart/:id',orderController.deleteToCart);
    router.get('/OrderList',orderController.getOrderListPage);
    router.get('/orderDetail/:id',orderController.detailOrder);
    router.post('/orderDelete',orderController.deleteOrder);

    return app.use('/',router);
}

module.exports=initWebRoutes;