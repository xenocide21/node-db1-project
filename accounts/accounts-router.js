const router = require('express').Router()
const accountsDb = require('./accounts-model')

router.get('/', (req, res) =>{
    accountsDb.find(req.query)
        .then( r => {
            let sortedAccounts
            if(req.query.sortBy) {
                const sortByArr = req.query.sortBy.split(':')

                if(sortByArr[1] = 'asc'){
                    sortedAccounts = r.sort((a, b) =>{
                        return a[sortByArr[0] > b[sortByArr[0]]]
                    })
                } else if(sortByArr[1] ='desc') {
                    sortedAccounts = r.sort((a, b) =>{
                        return a[sortByArr[0] < b[sortByArr[0]]]
                    })
                }
            } else {
                sortedAccounts = r
            }
            res.status(200).json({message:"Status 200: Success", resource: sortedAccounts})
        })
        .catch(err =>{
            res.status(500).json({message: "Status 500: Error", err})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    accountsDb.findById(id)
        .then( r => {
            if(r[0]) {
                res.status(200).json({message: "Status 200: Success", resource: r})
            } else {
                res.status(400).json({ message: "Status 404: Not Found"})
            }
        })
        .catch( err => {
            res.status(500).json({ message: "Status 500: Error", err})
        })
})

router.post('/', (req, res) => {
    const newAccount = req.body
    accountsDb.insert(newAccount)
        .then(newAccount => {
            res.status(200).json({ message: " Status 200: Success", resource: newAccount})
        })
        .catch( err => {
            res.status(500).json({ message: "Status 500: Error", err})
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    accountsDb.del(id)
        .then( q => {
            res.status(204).json({ message: "Status 204: Resource Deleted", resource: q})
        })
        .catch( err => {
            res.status(500).json({ message: "Status 500: Error", err})
        })
})

router.put('/:id', (req, res) =>{
    const id = req.params.id
    const changes = req.body
    accountsDb.update(id, changes)
        .then( updatedAccount => {
            res.status(200).json({ message: "Status 200: Success", resource: updatedAccount})
        })
        .catch( err => {
            res.status(500).json({ message: "Status 500: Error", err})
        })
})

module.exports = router