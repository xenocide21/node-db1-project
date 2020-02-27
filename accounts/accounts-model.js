const db = require('../data/dbConfig')

module.exports = {
    find,
    findById,
    insert,
    del,
    update
}

function find(query) {
    const limitArr = query.limiter.split(':')

    return db('accounts')
        .orderBy(limitArr[0], limitArr[1])
        .limit(Number(limitArr[2]))
}

function findById(accountId) {
    return db('accounts')
        .where({ id: accountId})
}

function insert(account) {
    return db('accounts')
        .insert(account)
        .then( ids => {
            return db('accounts').where({id: ids[0]}).first()
        })
}

function del(accountID) {
    return db('accounts')
        .where ({ id: accountID })
        .del()
}

function update(accountId, changes) {
    return db('accounts')
        .where({ id: accountId })
        .update(changes)
}