const crud = require('./../../crud');

async function createProduct(newProduct){
    return crud.save('products', undefined, newProduct)
}

async function editProduct(idProduct, product){
    return await crud.save('products', idProduct, product)
}

async function deleteProduct(idProduct){
    return await crud.remove('products', idProduct)
}

async function verifyifExistProduct(idProduct) {
    let exist = true
    try {
        await crud.getById('products', idProduct)
    } catch (err) {
        console.log("to q")
        exist = false
        return exist
    }
    return exist
}


module.exports = {
    createProduct,
    editProduct,
    deleteProduct,
    verifyifExistProduct
}