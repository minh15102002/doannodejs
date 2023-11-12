import db from "../models";

const payToCart=async(dataCustomer,dataOrder)=>{
    try {
        let customer=await db.Customer.create(dataCustomer);
        if(customer){
            dataOrder.map(item=>{
                item.customer_id=customer.id;
                return item;
            })
            await db.Order.bulkCreate(dataOrder)
        }
    } catch (error) {
        console.log(error);
    } 
}

const padTo2Digits=(num)=> {
    return num.toString().padStart(2, '0');
}

const formatDate=(date)=> {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
}

const getAllCustomer=async()=>{
    try {
        let customers=await db.Customer.findAll({});
        customers.map(item=>{
            item.createdAt=formatDate(item.createdAt);
            return item;
        })
        return customers;
    } catch (error) {
        console.log(error)
    }
}

const deleteOrder=async(id)=>{
    try {
        await  db.Customer.destroy({
            where:{
                id:id
            }
        });
        await db.Order.destroy({
            where:{customer_id:id}
        })
    } catch (error) {
        console.log(error);
    }
}

const getCustomerById=async(id)=>{
    try {
        let customer=await db.Customer.findAll({
            where:{
                id:id
            },
            include: [
                { model: db.Order,as:"orderData"},
            ],
            raw:false,
            nest:true     
        })
        let orderData=customer[0].orderData;
        let arrProduct=[];
        for(let i=0;i<orderData.length;i++){
            let product=await db.Product.findOne({
                where:{id:orderData[i].product_id},
                attributes: ['name','feature_image']
            })
            product.feature_image= `data:image/jpeg;base64,${Buffer.from(product.feature_image, 'base64').toString('binary')}`;
            product.quantity=orderData[i].quantity
            arrProduct.push(product)
        }
        
        return {customer:customer[0],arrProduct}
    } catch (error) {
        console.log(error)
    }
}

module.exports={payToCart,getAllCustomer,deleteOrder,getCustomerById}