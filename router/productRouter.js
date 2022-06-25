const express = require('express')
const Contenedor = require('../containers/container')
const { Router } = express

const contenedorProducts = new Contenedor('products.json')
const productRouter = Router()

const administrador = true;

function auth(req, res, next) {
    if(administrador) {
        next()
    }
    else {
        res.status(400)
        res.send('No admin')
    }
}

productRouter.get('/', (req, res) => {
    res.json(contenedorProducts.getAll())
})

productRouter.get('/:id', (req, res) => {
    res.json(contenedorProducts.getByID(req.params.id))
})

productRouter.post('/',auth, (req, res) => {
    res.json(contenedorProducts.save(req.body))
})

productRouter.put('/:id',auth, (req, res) => {
    console.log(req.body)
    res.json(contenedorProducts.editProductById(req.body, parseInt(req.params.id)))
})

productRouter.delete('/:id',auth, (req, res) => {
    res.json(contenedorProducts.deleteByID(req.params.id))
})

productRouter.delete('/',auth, (req, res) => {
    res.json(contenedorProducts.deleteAll())
})

module.exports = productRouter