import productService from '../services/productService'
import menuService from '../services/menuService';

let getProductList=async(req,res)=>{
    try {
        let data=await productService.getAllProduct();
        res.render('admin/product/ProductList',{data});
    } catch (error) {
        console.log(error);
    }
}

let getCreateProductPage=async(req,res)=>{
    try {
        let data=await productService.getCartegoryList();
        res.render('admin/product/CreateProduct',{data});
    } catch (error) {
        console.log(error);
    }
}

let createNewProduct=async(req,res)=>{
    try {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files.feature_image) {
            return res.send('Bạn chưa chọn ảnh đại diện');
        }
        else if (!req.files.image_details) {
            return res.send('Bạn chưa chọn ảnh chi tiết');
        }
        await productService.createNewProduct(req.body,req.files);
        res.redirect("/admin/productList");
    } catch (error) {
        console.log(error);
    }
}

let getEditProductPage=async(req,res)=>{
    try {
        let data=await productService.getCartegoryList();
        let dataProduct=await productService.getEditProduct(req.params.id);
        res.render('admin/product/EditProduct',{
            dataProduct:dataProduct[0],
            data,
            productImageData:dataProduct[0].productImageData,
            productTagData:dataProduct[0].productTagData
        });
    } catch (error) {
        console.log(error);
    }
}

let updateProduct=async(req,res)=>{
    try {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        await productService.updateProduct(req.params.id,req.body,req.files);
        res.redirect("/admin/productList");
    } catch (error) {
        console.log(error);
    }
}

let deleteProduct=async(req,res)=>{
    try {
        await productService.deleteProduct(req.body.id);
        res.redirect("/admin/productList");
    } catch (error) {
        console.log(error);
    }
}

let getDetailProductShop=async(req,res)=>{
    let data=await productService.getDetailProductShop(req.params.id);
    let menus=await menuService.getAllMenu();

    res.render("shop/detailProductShop",{
        menus,
        data,
        dataDetailProductImage:data.productImageData,
        dataTagProduct:data.productTagData
    });
}

module.exports={
    getProductList,getCreateProductPage,createNewProduct,getEditProductPage,updateProduct,deleteProduct,getDetailProductShop
}