const crud = require('../../crud');

async function createOrder(order) {
    const usersHandler = require('../users/users.handler')

    const createdOrders = await getOrders()
    let numberOfOrder = 0
    for (let i of createdOrders) {
        if (i.status == "open" && i.userId == order.userId) {
            throw {
                error: '0001',
                message: "You have already one order opened",
                requiredFields: ['userId']
            }
        } else if (i.status == "close" && i.userId == order.userId) {
            numberOfOrder++
        }
    }

    order.status = "open"
    order.number = numberOfOrder + 1

    if (await usersHandler.verifyifExistUser(order.userId)) {
        return crud.save('orders', undefined, order)
    } else {
        throw {
            error: '0003',
            message: "User not found!",
            requiredFields: ['userId']
        }
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

async function getOrderById(id) {
    return crud.getById('orders', id)
}

async function getOrders() {
    return await crud.get('orders')
}

async function editOrder(orderId, order) {
    const orderProductsHandler = require('../orderProducts/orderProducts.handler')
    const orderProducts = await orderProductsHandler.getOrderProducts()
    if (!orderProducts.some(e => e.orderId == orderId)) {
        throw {
            error: '0003',
            message: "Add an item at order before close it!",
            requiredFields: ["'status': 'close'"]
        }
    }
    if (!order.status) {
        throw {
            error: '0002',
            message: "You can't close your order",
            requiredFields: ["'status': 'close'"]
        }
    }
    const newOrder = await getOrderById(orderId)
    newOrder.status = order.status
    return await crud.save('orders', orderId, newOrder)
}

async function deleteOrder(idOrder) {
    return await crud.remove('orders', idOrder)
}

module.exports = {
    createOrder,
    verifyifExistOrder,
    editOrder,
    deleteOrder,
    getOrderById,
    getOrders
}