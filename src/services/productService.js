import db from "../models";
import partial from "./partial";

let getCartegoryList=async()=>{
    try {
        let data=await db.Cartegory.findAll({
            raw:true
        });
        partial.recurse(data,0,'');
        return data;
    } catch (error) {
        console.log(error)
    }
}

let createNewProduct=async(data,dataImage)=>{
    try {
        //Tạo product
        let productImg=dataImage.feature_image[0]
        let product=await db.Product.create({
            name:data.name,
            price:data.price,
            feature_image:partial.getBase64(productImg.path),
            content:data.content,
            cartegory_id:data.cartegory_id,
            user_id:'1'
        });

            //Tạo Product_Image
            let image_details=dataImage.image_details;
            let dataProductImg=[];
            if(image_details && image_details.length>0){
                image_details.map(async(item)=>{
                    let object={};
                    object.product_id=product.id,
                    object.image=partial.getBase64(item.path);
                    dataProductImg.push(object);
                });
            }
            if(dataProductImg && dataProductImg.length>0){
                await db.Product_Image.bulkCreate(dataProductImg);
            }

        //Tạo Tag
        let dataTags=data.tags;
        if(typeof dataTags === 'string' || dataTags instanceof String){
            let tag=await db.Tag.findOrCreate({
                where:{
                    name:dataTags
                },
                defaults:{
                    name:dataTags
                },
                raw:false
            })
            if(tag && tag[0]){
                await db.Product_Tag.create({
                    product_id:product.id,
                    tag_id:tag[0].id
                })
            }
        }else if(dataTags && dataTags.length>0){
            for(let i=0;i<dataTags.length;i++){
                let tag=await db.Tag.findOrCreate({
                    where:{
                        name:dataTags[i]
                    },
                    defaults:{
                        name:dataTags[i]
                    },
                    raw:false
                })
                if(tag && tag[0]){
                    await db.Product_Tag.create({
                        product_id:product.id,
                        tag_id:tag[0].id
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

let getAllProduct=async()=>{
    try {
        let data=await db.Product.findAll({
            raw:false,
            order: [
                ['createdAt','DESC']
            ],
            include: [
                { model: db.Cartegory,as:"cartegoryData", attributes: ['id', 'name'] },
            ],
            nest:true
        })
        if (data && data.length > 0) {
            data.map(item => {
                item.feature_image = `data:image/jpeg;base64,${Buffer.from(item.feature_image, 'base64').toString('binary')}`;
                return item;
            })
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getEditProduct=async(id)=>{
    try {
        let dataProduct = await db.Product.findAll({
            where: { id: id },
            include: [
                { model: db.Product_Image, attributes: ['image'],as:"productImageData"},
                { model: db.Product_Tag, attributes: ['tag_id'],
                include: [
                    { model: db.Tag, attributes: ['name'],as:"tagData"}
                ],
                as:"productTagData" }
            ],
            raw: false,
            nest:true
        });
        return dataProduct;
    } catch (error) {
        console.log(error);
    }
}

let updateProduct=async(id,data,dataImage)=>{
    try {
        let product=await db.Product.findOne({
            where: { id: id },
            raw: false
        })
        if(product){
            await  db.Product_Tag.destroy({
                where:{
                    product_id:product.id
                }
            });
            product.name=data.name;
            product.price=data.price;
            product.content=data.content;
            product.cartegory_id=data.cartegory_id;
            product.user_id='2';
            if(dataImage){
                if(dataImage.feature_image){
                    product.feature_image=partial.getBase64(dataImage.feature_image[0].path);
                }
                if(dataImage.image_details){
                    await db.Product_Image.destroy({
                        where:{
                            product_id:product.id
                        }
                    });
                    let image_details=dataImage.image_details;
                    let dataProductImg=[];
                    if(image_details && image_details.length>0){
                        image_details.map(async(item)=>{
                            let object={};
                            object.product_id=product.id,
                            object.image=partial.getBase64(item.path);
                            dataProductImg.push(object);
                        });
                    }
                    if(dataProductImg && dataProductImg.length>0){
                        await db.Product_Image.bulkCreate(dataProductImg);
                    }
                }
            }

            let dataTags=data.tags;
            if(typeof dataTags === 'string' || dataTags instanceof String){
                let tag=await db.Tag.findOrCreate({
                    where:{
                        name:dataTags
                    },
                    defaults:{
                        name:dataTags
                    },
                    raw:false
                })
                if(tag && tag[0]){
                    await db.Product_Tag.create({
                        product_id:product.id,
                        tag_id:tag[0].id
                    })
                }
            }else if(dataTags &&dataTags.length){
                for(let i=0;i<dataTags.length;i++){
                    let tag=await db.Tag.findOrCreate({
                        where:{
                            name:dataTags[i]
                        },
                        defaults:{
                            name:dataTags[i]
                        },
                        raw:false
                    })
                    if(tag && tag[0]){
                        await db.Product_Tag.create({
                            product_id:product.id,
                            tag_id:tag[0].id
                        })
                    }
                }
            }

            await product.save();
        }
    } catch (error) {
        console.log(error);
    }
}

let deleteProduct=async(id)=>{
    try {
        let dataProduct=await db.Product.findOne({
            where:{id:id},
            raw:false
        });
        if(dataProduct){
            await db.Product_Image.destroy({
                where:{
                    product_id:dataProduct.id
                }
            });
            await db.Product_Tag.destroy({
                where:{
                    product_id:dataProduct.id
                }
            });
            await dataProduct.destroy();
        }
    } catch (error) {
        console.log(error);
    }
}

let getDetailProductShop=async(id)=>{
    let data=await db.Product.findOne({
        where:{id:id},
        include: [
            { model: db.Product_Image, attributes: ['image'],as:"productImageData"},
            { model: db.Product_Tag, attributes: ['tag_id'],
            include: [
                { model: db.Tag, attributes: ['name'],as:"tagData"}
            ],
            as:"productTagData" }
        ],
        raw: false,
        nest:true
    })
    data.view_count=data.view_count+1;
    await data.save();
    return data;
}

let getProductOrderById=async(id,limit)=>{
    try {
        let data=await db.Product.findAll({
            raw:false,
            order: [
                [id,'DESC']
            ],
            limit:limit,
        })
        if (data && data.length > 0) {
            data.map(item => {
                item.feature_image = `data:image/jpeg;base64,${Buffer.from(item.feature_image, 'base64').toString('binary')}`;
                return item;
            })
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getProductToCart=async(cart)=>{
    try {
        let products=[];
        if(cart && cart.length>0){
            for(let i=0;i<cart.length;i++){
                let object=await db.Product.findOne({
                    where:{id:cart[i].product_id},
                    attributes: {
                        exclude: ['content']
                    }
                })
                if(object){
                    object.feature_image = `data:image/jpeg;base64,${Buffer.from(object.feature_image, 'base64').toString('binary')}`;
                    object.quantity=cart[i].quantity
                    products.push(object)
                }
            }
        }
        return products;
    } catch (error) {
        console.log(error);
    }
}

module.exports={createNewProduct,getAllProduct,getEditProduct,updateProduct,deleteProduct,
    getCartegoryList,getDetailProductShop,getProductOrderById,getProductToCart
}