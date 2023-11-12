import orderService from '../services/orderService';

const addToCart=async(req,res)=>{
    try {
        if(typeof req.session.cart==='undefined'){
            req.session.cart=[];
            req.session.cart.push({
                product_id:req.params.id,
                quantity:req.body.quantity?req.body.quantity:'1'
            })
        }else{
            let cart=req.session.cart;
            let newProduct=true;
            for(let i=0;i<cart.length;i++){
                if(cart[i].product_id===req.params.id){
                    cart[i].quantity=req.body.quantity?req.body.quantity/1+cart[i].quantity/1:cart[i].quantity/1+1;
                    newProduct=false;
                    break;
                }
            }
            if(newProduct){
                req.session.cart.push({
                    product_id:req.params.id,
                    quantity:req.body.quantity?req.body.quantity:'1'
                })
            }
        }
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

const updateToCart=(req,res)=>{
    let cart=req.session.cart;
    let product_id=req.params.id;
    let action=req.query.action;
    for(let i=0;i<cart.length;i++){
        if(cart[i].product_id==product_id){
            switch(action){
                case "add":
                    cart[i].quantity++;
                    break;
                case "remove":
                    cart[i].quantity--;
                    break;
                default:
                    console.log("Error");
                    break;
            }
            break;
        }
    }
    req.session.cart=cart;
    res.redirect("back")
}

const deleteToCart=(req,res)=>{
    let cart=req.session.cart;
    req.session.cart=cart.filter(item=>item.product_id!==req.params.id);
    res.redirect("back")
}

const getOrderListPage=async(req,res)=>{
    let customers=await orderService.getAllCustomer();
    res.render('admin/order/OrderList',{customers});
}

const deleteOrder=async(req,res)=>{
    await orderService.deleteOrder(req.body.id);
    res.redirect("back")
}

const detailOrder=async(req,res)=>{
    let data=await orderService.getCustomerById(req.params.id);
    res.render('admin/order/detailOrder',{customer:data.customer,products:data.arrProduct});
}

module.exports={addToCart,updateToCart,deleteToCart,getOrderListPage,deleteOrder,detailOrder}