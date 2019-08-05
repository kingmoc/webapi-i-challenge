const express = require('express')
const Users = require('./data/db')

const server = express()
server.use(express.json())

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "The users information could not be retrieved."})
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body

    Users.insert(newUser)
        .then(user => {
            console.log(user)
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: "Please provide name and bio for the user."})
        })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id
    
    Users.findById(userId)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: "The user information could not be retrieved."})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
    
    Users.remove(userId)
    .then(num => {
        res.status(200).json({ message: 'hub deleted successfully' })
    })
    .catch(err => {
        res.status(500).json({ message: "The user could not be removed" })
    })
    
})

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id
    const changes = req.body

    Users.update(userId, changes)
        .then(num => {
            if (num === 1) {
                Users.findById(userId)
                    .then(user => {
                        res.status(200).json(user);
                    })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist."  });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'error updating user' });
        })

})












const port = 8001;
server.listen(port, () => console.log('api running'))

