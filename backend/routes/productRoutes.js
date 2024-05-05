const express = require('express')
const mongoose = require('mongoose')
const { Product } = require('../models/ProductModel')
const {Order} = require('../models/OrderModel')
const { requireSignIn, isadmin } = require('../middlewares/authmiddleware')
const formidable = require('express-formidable')  // to get photos
const fs = require('fs');
const slugify = require('slugify')
const braintree = require('braintree')
const router = express.Router()

//payment gateway from npm websit e for braintree
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//Adding new product
router.post('/add-product', requireSignIn, isadmin, formidable(), async (req, res) => {
    try {
        const { name, description, quantity, shipping, category, price, slug } = req.fields; //to get non file fields. means only written data.
        const { photo } = req.files;  //to get field that contains files. example photos. this is from formidable.
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'Discription is required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required and should be less than 1Mb' })
        }
        const addproduct = new Product({ ...req.fields, slug: slugify(name) })
        if (photo) {
            addproduct.photo.data = fs.readFileSync(photo.path)
            addproduct.photo.contentType = photo.type;
        }
        await addproduct.save();
        res.status(201).send({ success: true, message: 'new product added successfully', addproduct })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'error adding new product', error })
    }
})

//Getting all products
router.get('/get-allproducts', async (req, res) => {
    try {
        const allproducts = await Product.find({}).select("-photo").limit(8).sort({ createdAt: -1 }).populate('category')
        res.status(200).send({
            success: true,
            totalCount: allproducts.length,
            message: 'all products are here',
            allproducts
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: 'error getting all products', error })
    }
})

//getting single product
router.get('/get-singleproduct/:slug', async (req, res) => {
    try {
        const singleproduct = await Product.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'single product is here',
            singleproduct
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'error to get single product',
            error
        })
    }
})

//getting product photo
router.get('/get-productpic/:id', async (req, res) => {
    try {
        const { id } = req.params
        const productpic = await Product.findById(id).select('photo')
        if (productpic.photo.data) {
            res.set("Content-Type", productpic.photo.contentType)
            res.status(200).send(productpic.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error to get product photo',
            error
        })
    }
})

//deleting single product
router.delete('/deleteproduct/:id', requireSignIn, isadmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteproduct = await Product.findByIdAndDelete(id).select('-photo')
        res.status(200).send({
            success: true,
            message: 'product deleted successfully',
            deleteproduct
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: true,
            message: 'error to delete product',
            error
        })
    }

})


//update product
router.put('/updateproduct/:id', requireSignIn, isadmin, formidable(), async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        const { id } = req.params
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: 'Name field is required' })
            case !description:
                return res.status(500).send({ message: 'Description field is required' })
            case !price:
                return res.status(500).send({ message: "price is required" })
            case !category:
                return res.status(500).send({ message: "category is required" })
            case !quantity:
                return res.status(500).send({ message: 'quantity is required' })
            case photo && photo.size > 100000:
                return res.status(500).send({ message: 'photo is required and should be less than 1mb' })
        }
        const updateproduct = await Product.findByIdAndUpdate(id, { ...req.fields, slug: slugify(name) },
            { new: true });
        if (photo) {
            updateproduct.photo.data = fs.readFileSync(photo.path)
            updateproduct.photo.contentType = photo.type;
        }
        await updateproduct.save();
        res.status(201).send({ success: true, message: 'product updated successfully', updateproduct })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'error to update product details', error })
    }

})
//filter products
router.post('/product-filters', async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {}
        if (checked.length > 0) { args.category = checked; }
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] } //because we have to find the middle values of array so will target 1st and last index of array
        const filterProducts = await Product.find(args)
        res.status(200).send({ success: true, filterProducts })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'error to filter products', error })
    }
})

//search products
router.get('/search/:keyword', async (req, res) => {
    try {
        const { keyword } = req.params
        const searchProducts = await Product.find({
            $or: [  //using or condition between name and description
                { name: { $regex: keyword, $options: "i" } },  //regex means regularexpressions. these are patterns used to match character combination in strings.
                { description: { $regex: keyword, $options: "i" } },  //"i" this makes our search caseInsensitive.
            ]
        }).select("-photo");
        res.json(searchProducts);
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: 'error in search method', error })
    }
})

// payment routes
// getting token from braintree for account verification
router.get('/braintree/token',async (req, res) => {
    try {
        gateway.clientToken.generate({},
            function (err, response) { 
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.send(response)
                }
            })
    } catch (error) {
        console.log(error)
    }
})

// //payments 
router.post('/braintree/payment', requireSignIn, async (req, res) => {
    try {
        const { cart, nonce } = req.body  
        let total = 0;
        cart.map((i) => {
            total += i.price  
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {
                if (result) {
                    const order = new Order({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save()
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;