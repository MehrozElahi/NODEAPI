const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handing Get request to /Products'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
    res.status(200).json({
        message: 'Handing POST request to /Products',
        createdProduct: product,
    });
});

router.get('/:Id', (req, res, next) => {
    const id = req.params.Id;
    if (id === 'special') {
        res.status(200).json({
            message: 'Special ID Discovered'
        })
    } else {
        Product.find({ _id: id }, 'name').exec(function(err, product) {
            if (err) {
                console.log(err)
                res.json({ message: 'Error Occured', status: 404 })
            } else {
                console.log(product)
                res.json({
                    message: 'You passed ID',
                    product: product
                })
            }
        })

    }

})


router.patch('/productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    })
})

router.delete('/productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product Deleted'
    })
})

module.exports = router