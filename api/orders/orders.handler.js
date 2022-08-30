const crud = require('../../crud');

async function createOrder(order){
    const usersHandler = require('../users/users.handler')

    const createdOrders = await getOrders()
    for(let i of createdOrders){
        if(i.status == "open"){
            return "You already have one order opened"
        }
    }
    if(await usersHandler.verifyifExistUser(order.userId)){
        return crud.save('orders', undefined, order)
    }else{
        return('This user not exists')
    }
}


async function verifyifExistOrder(idOrder) {
    let exist = true
    try {
        await crud.getById('orders', idOrder)
    } catch (err) {
        exist = false
        return exist
    }
    return exist
}

async function getOrderById(id){
    return crud.getById('orders', id)
}

async function getOrders(){
    return await crud.get('orders')
}

async function editOrder(orderId, order){
    const orderProductsHandler = require('../orderProducts/orderProducts.handler')
    const orderProducts = await orderProductsHandler.getOrderProducts()
    if(!orderProducts.some(e => e.orderId == orderId)){
        return "Add an item before close the order"
    }
    const newOrder = await getOrderById(orderId)
    newOrder.status = order.status
    return await crud.save('orders', orderId, newOrder)
}

async function deleteOrder(idOrder){
    return await crud.remove('orders', idOrder)
}

module.exports = {
    createOrder,
    verifyifExistOrder,
    editOrder,
    deleteOrder,
    getOrderById
}