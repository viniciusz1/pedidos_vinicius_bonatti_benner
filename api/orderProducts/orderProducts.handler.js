const crud = require('../../crud');

async function createOrderProducts(orderProduct){
    const productsHandler = require('../products/products.handler')
    const ordersHandler = require('../orders/orders.handler')


    if(!(await ordersHandler.verifyifExistOrder(orderProduct.orderId))){
        return("Order not found")
    }
    const order = await ordersHandler.getOrderById(orderProduct.orderId)

    if(order.status != "open"){
        return ("You can't add products for this order!")
    }


    for(let i of orderProduct.productsList){
        if(!(await productsHandler.verifyifExistProduct(i.productId))){
            return("Product not found")
        }else{
            const orderProducts = await getOrderProducts()
            const newOrderProducts = orderProducts.find(e => e.productId == i.productId)
            if(newOrderProducts != undefined){
                newOrderProducts.quantity = newOrderProducts.quantity + i.quantity
                return crud.save('orderProducts', newOrderProducts.id, newOrderProducts)
            }else{
                let adicionar = {
                    productId: i.productId,
                    quantity: i.quantity,
                    orderId: orderProduct.orderId
                }
                return crud.save('orderProducts', undefined, adicionar)
            }
        }
    }
    

}

async function getOrderProducts(){
    return await crud.get('orderProducts')
}

async function editOrderProducts(idOrderProducts, orderProducts){
    let ordersHandler = require('../orders/orders.handler')
    let oldOrder = await getOrderProductsById(idOrderProducts)
    oldOrder.quantity = oldOrder.quantity - orderProducts.quantity
    let order = await ordersHandler.getOrderById(oldOrder.orderId)
    if(oldOrder.quantity <= 0){
        return await crud.remove('orderProducts', idOrderProducts)
    }

    if(order.status == 'open'){
        return await crud.save('orderProducts', idOrderProducts, oldOrder)
    }else{
        throw { 
            error: '0001', 
            message: "You can't change the quantity because your status is not 'open'", 
            camposNecessarios: ['quantity'] 
        }
    }
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
    deleteOrderProducts,
    getOrderProductsById
}