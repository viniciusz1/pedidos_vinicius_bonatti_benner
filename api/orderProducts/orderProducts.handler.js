const crud = require('../../crud');

async function createOrderProducts(orderProduct){
    const productsHandler = require('../products/products.handler')
    const ordersHandler = require('../orders/orders.handler')
    if(!(await productsHandler.verifyifExistProduct(orderProduct.productId))){
        return("Product not found")
    }
    if(!(await ordersHandler.verifyifExistOrder(orderProduct.orderId))){
        return("Order not found")
    }
    const order = await ordersHandler.getOrderById(orderProduct.orderId)

    if(order.status != "open"){
        return ("You can't add products for this order!")
    }

}

async function getOrderProducts(){
    return await crud.get('orderProducts')
}

async function editOrderProducts(idOrderProducts, orderProducts){
    return await crud.save('orderProducts', idOrderProducts, orderProducts)
}

async function getOrderProductsById(id){
    return await crud.getById('orderProducts',id)
}

async function deleteOrderProducts(idOrderProducts){

    const ordersHandler = require('../orders/orders.handler')
    const orderProducts = await getOrderProductsById(idOrderProducts)
    const order = await ordersHandler.getOrderById(orderProducts.orderId)
    if(order.status == 'open'){
        return await crud.remove('orderProducts', idOrderProducts)
    }else{
        return "You can't remove this product"
    }
}

module.exports = {
    createOrderProducts,
    getOrderProducts,
    editOrderProducts,
    deleteOrderProducts
}