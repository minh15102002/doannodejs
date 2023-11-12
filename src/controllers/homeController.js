import sliderService from '../services/sliderService';
import menuService from '../services/menuService';
import cartegoryService from '../services/cartegoryService';
import productService from '../services/productService';
import orderService from '../services/orderService';

const getHomePage=async(req,res)=>{
    let sliders=await sliderService.getAllSlider();
    let menus=await menuService.getAllMenu();
    let cartegory=await cartegoryService.getAllCartegory();
    let dataProductOrderCreate=await productService.getProductOrderById('createdAt',4);
    let dataProductOrderViewCount=await productService.getProductOrderById('view_count',5);

    res.render("shop/home",{
        sliders,
        menus,
        cartegory,
        dataProductOrderCreate,
        dataProductOrderViewCount
    });
}

const getCartShopPage=async(req,res)=>{
    let menus=await menuService.getAllMenu();
    let products=await productService.getProductToCart(req.session.cart);
    res.render("shop/cartShopPage",{menus,products});
}

const getPayShopPage=async(req,res)=>{
    let menus=await menuService.getAllMenu();
    let products=await productService.getProductToCart(req.session.cart);

    res.render('shop/payShopPage',{menus,products});
}

const payToCart=async(req,res)=>{
    await orderService.payToCart(req.body,req.session.cart);
    req.session.cart=[];
    res.redirect('back');
}

module.exports={getHomePage,getCartShopPage,getPayShopPage,payToCart}