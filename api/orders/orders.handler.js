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

async function editOrder(idUser, user){
    return await crud.save('orders', idUser, user)
}

async function deleteOrder(idUser){
    return await crud.remove('orders', idUser)
}

module.exports = {
    createOrder,
    verifyifExistOrder,
    editOrder,
    deleteOrder,
    getOrderById
}