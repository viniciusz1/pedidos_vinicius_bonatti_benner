const crud = require('./../../crud');

async function createUser(newUser){
    return crud.save('users', undefined, newUser)
}

async function getUserById(id) {
    return crud.getById('users', id)
}

async function getUser() {
    return crud.get('users')
}

async function editUser(idUser, user){
    return await crud.save('users', idUser, user)
}

async function deleteUser(idUser){
    return await crud.remove('users', idUser)
}

async function verifyifExistUser(idUser) {
    let exist = true
    try {
        await crud.getById('users', idUser)
    } catch (err) {
        exist = false
        return exist
    }
    return exist
}

module.exports = {
    createUser,
    verifyifExistUser,
    editUser,
    deleteUser,
    getUserById,
    getUser
}