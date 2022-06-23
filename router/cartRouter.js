const express = require('express')
const Contenedor = require('../containers/container')
const { Router } = express

const contenedorCart = new Contenedor('carts.json')
const cartRouter = Router()


cartRouter.get('/',  (req, res) => {
    res.json(contenedorCart.getAll())
})

cartRouter.get('/:id/products',  (req, res) => {
    let listCart =  contenedorCart.getAll();
    res.json(listCart[(req.params.id-1)])
})

cartRouter.post('/', (req, res) => {
    obj = {...req.body, ...{ products: []} }
    res.json(contenedorCart.save(obj))
})

cartRouter.delete('/', (req, res) => {
    res.json(contenedorCart.deleteAll())
})

cartRouter.delete('/:id', (req, res) => {
    res.json(contenedorCart.deleteByID(req.params.id))
})

cartRouter.delete('/:id/products/:id', (req, res) => {
    const cartID = req.path[1];
    const prodId = req.params.id;
    const cart = contenedorCart.getByID(cartID);
    let cartMod={products:[]};
    for(product of cart.products)
    {
        console.log(product)
        if(product.id != prodId){
            cartMod.products.push(product);
        }
    };
    console.log(cartID);
    cartMod['id'] = cartID;
    console.log(cartMod);
    contenedorCart.deleteByID(cartID);
    res.json(contenedorCart.save(cartMod))
})

cartRouter.post('/:id/products', (req, res) => {
    const product = req.body
    const cartID = req.params.id
    const cart =  contenedorCart.getByID(cartID)
    cart.products.push(product)

    const newObj = contenedorCart.editByBody(cart, cartID)

    res.json(newObj)
})


module.exports = cartRouter