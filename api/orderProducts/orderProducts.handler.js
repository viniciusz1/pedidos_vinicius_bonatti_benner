const crud = require('../../crud');

async function createOrderProducts(orderProduct) {
    const productsHandler = require('../products/products.handler')
    const ordersHandler = require('../orders/orders.handler')
    const order = await ordersHandler.getOrderById(orderProduct.orderId)


    if (!(await ordersHandler.verifyifExistOrder(orderProduct.orderId))) {
        throw {
            error: '0003',
            message: "Order not found!",
            requiredFields: ["productsList: {productId: string, quantity: number}[], 'orderId'"]
        }
    }

    if (order.status != "open") {
        throw {
            error: '0001',
            message: "Your status is not 'open'",
            requiredFields: ["productsList: {productId: string, quantity: number}[]", 'orderId']
        }
    }

    for (let i of orderProduct.productsList) {
        if (!(await productsHandler.verifyifExistProduct(i.productId))) {
            throw {
                error: '0003',
                message: "Product not found!",
                requiredFields: ["productsList: {productId: string, quantity: number}[]", 'orderId']
            }
        }
    }

    let text = undefined 
    let listReturn = []
    let newOrderProducts = await crud.getWithFilter('orderProducts','orderId','==', orderProduct.orderId)
    
    for (let i of orderProduct.productsList) {
        let newOrderProduct = newOrderProducts.find(e => e.productId == i.productId)
        if (newOrderProduct != undefined) {
            newOrderProduct.quantity = newOrderProduct.quantity + i.quantity
            text = await crud.save('orderProducts', newOrderProduct.id, newOrderProduct)
            listReturn.push(text)
        } else {
            let addNew = {
                productId: i.productId,
                quantity: i.quantity,
                orderId: orderProduct.orderId
            }
            text = await (crud.save('orderProducts', undefined, addNew))
            listReturn.push(text)
        }
     }
    return listReturn
}

async function getOrderProducts() {
    return await crud.get('orderProducts')
}

async function editOrderProducts(action, orderProducts) {
    let ordersHandler = require('../orders/orders.handler')
    const productsHandler = require('../products/products.handler')
    if(action != "remove" && action != "add"){
        throw {
            error: '0005',
            message: "Check your route!",
            routeRequired: ["http://localhost:8080/api/orderProducts/add","http://localhost:8080/api/orderProducts/remove"],
            requiredFields: ["productsList: {productId: string, quantity: number}[], 'orderId'"]
        }
    }

    if (!(await ordersHandler.verifyifExistOrder(orderProducts.orderId))) {
        throw {
            error: '0003',
            message: "Order not found!",
            requiredFields: ["productsList: {productId: string, quantity: number}[], 'orderId'"]
        }
    }

    for (let i of orderProducts.productsList) {
        if (!(await productsHandler.verifyifExistProduct(i.productId))) {
            throw {
                error: '0003',
                message: "Product not found!",
                requiredFields: ["productsList: {productId: string, quantity: number}[]", 'orderId']
            }
        }
    }


    let order = await ordersHandler.getOrderById(orderProducts.orderId)

    if (order.status != 'open') {
        throw {
            error: '0001',
            message: "You can't change the quantity because your status is not 'open'",
            requiredFields: ['quantity', 'orderId', 'productId']
        }
    }   

    let text = undefined 
    let listReturn = []
    let oldOrderProducts = await crud.getWithFilter('orderProducts','orderId','==', orderProducts.orderId)

    for (let i of orderProducts.productsList) {
        let oldOrderProduct = oldOrderProducts.find(e => e.productId == i.productId)
        if(action == "add"){
            if (oldOrderProduct != undefined) {
                oldOrderProduct.quantity = oldOrderProduct.quantity + i.quantity
                text = await crud.save('orderProducts', oldOrderProduct.id, oldOrderProduct)
                listReturn.push(text)
            } else {
                let addNew = {
                    productId: i.productId,
                    quantity: i.quantity,
                    orderId: orderProducts.orderId
                }
                text = await (crud.save('orderProducts', undefined, addNew))
                listReturn.push(text)
            }
        }else if(action == "remove"){
            oldOrderProduct.quantity = oldOrderProduct.quantity - i.quantity
            if (oldOrderProduct.quantity <= 0) {
                text = await crud.remove('orderProducts', oldOrderProduct.id)
                listReturn.push(text)
            }else{
                text = await crud.save('orderProducts', oldOrderProduct.id, oldOrderProduct)
                listReturn.push(text)
            }
        }        
     } 
    return listReturn
}


//DESCOMENTAR CASO DE MERDA
// async function editOrderProducts(idOrderProducts, orderProducts) {
//     let ordersHandler = require('../orders/orders.handler')
//     const productsHandler = require('../products/products.handler')

//     if (!(await ordersHandler.verifyifExistOrder(orderProducts.orderId))) {
//         throw {
//             error: '0003',
//             message: "Order not found!",
//             requiredFields: ["productsList: {productId: string, quantity: number}[], 'orderId'"]
//         }
//     }

//     if (!(await productsHandler.verifyifExistProduct(orderProducts.productId))) {
//         throw {
//             error: '0003',
//             message: "Product not found!",
//             requiredFields: ['quantity', 'orderId', 'productId']
//         }
//     }

//     let oldOrderProducts = await crud.getWithFilter('orderProducts','orderId','==', orderProducts.orderId)
//     let newOrderProduct = oldOrderProducts.find(e => e.productId == orderProducts.productId)
//     newOrderProduct.quantity = newOrderProduct.quantity - orderProducts.quantity
//     let order = await ordersHandler.getOrderById(newOrderProduct.orderId)

//     if (order.status != 'open') {
//         throw {
//             error: '0001',
//             message: "You can't change the quantity because your status is not 'open'",
//             requiredFields: ['quantity', 'orderId', 'productId']
//         }
//     }   

//     if (newOrderProduct.quantity <= 0) {
//         return await crud.remove('orderProducts', idOrderProducts)
//     }  
//     return await crud.save('orderProducts', idOrderProducts, newOrderProduct)
// }

async function getOrderProductsById(id) {
    return await crud.getById('orderProducts', id)
}

async function deleteOrderProducts(idOrderProducts) {
    const ordersHandler = require('../orders/orders.handler')
    const orderProducts = await getOrderProductsById(idOrderProducts)
    const order = await ordersHandler.getOrderById(orderProducts.orderId)
    if (order.status == 'open') {
        return await crud.remove('orderProducts', idOrderProducts)
    } else {
        throw {
            error: '0001',
            message: "You can't change the quantity because your status is not 'open'"
        }
    }
}

module.exports = {
    createOrderProducts,
    getOrderProducts,
    editOrderProducts,
    deleteOrderProducts,
    getOrderProductsById
}