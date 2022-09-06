const crud = require('./../../crud');


async function createProduct(newProduct){
    const saved =  crud.save('products', undefined, newProduct)
    return saved;
}

async function editProduct(idProduct, product){
    return await crud.save('products', idProduct, product)
}

async function deleteProduct(idProduct){
    return await crud.remove('products', idProduct)
}

async function getProductsById(idProduct){
    return await crud.getById('products',idProduct)
}

async function getProducts(){
    return await crud.get('products')
}

async function verifyifExistProduct(idProduct) {
    let exist = true
    try {
        await crud.getById('products', idProduct)
    } catch (err) {
        exist = false
        return exist
    }
    return exist
}


module.exports = {
    createProduct,
    editProduct,
    deleteProduct,
    verifyifExistProduct,
    getProductsById,
    getProducts
}