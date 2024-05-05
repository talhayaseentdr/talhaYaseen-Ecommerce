const express = require('express')
const mongoose = require('mongoose');
const { User } = require('../models/UserModel')
const {Order} = require('../models/OrderModel');
const { comparepassword, hashpassword } = require('../helpers/authHelpers')
const { requireSignIn, isadmin } = require('../middlewares/authmiddleware');
const JWT = require('jsonwebtoken')

const router = express.Router();

//Register user
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstname, lastname, phonenumber, isAdmin, address, answer } = req.body;
        let emptyfields = []

        if (!password) {
            emptyfields.push('password')
        }
        if (!email) {
            emptyfields.push('email')
        }
        if (!firstname) {
            emptyfields.push('fistname')

        }
        if (!lastname) {
            emptyfields.push('lastname');
        }
        if (!address) {
            emptyfields.push('address')
        }
        if (!phonenumber) {
            emptyfields.push('mobile')

        }

        if (!answer) {
            emptyfields.push('answer')
        }
        if (emptyfields.length > 0) {
            return res.status(400).json({ message: "please fill all the fields to register user", emptyfields })
        }
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(200).send({ success: false, message: 'already registered user' })
        }
        const hashedpassword = await hashpassword(password)
        const user = await new User({ email, password: hashedpassword, firstname, lastname, address, phonenumber, isAdmin, answer }).save();
        res.status(201).send({ success: true, message: 'user registered successfully', user })

    }
    catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: 'error in registering user request', error })
    }

})

// login route 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invalid email or password"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user is not registered",
            })
        }
        const match = await comparepassword(password, user.password)
        if (!match) {
            return res.status(200).json({ mssg: 'invalid password' })
        }
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7days' })
        res.status(200).send({
            success: true,
            mssg: 'login successfully',
            User: {
                _id:user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                address: user.address,
                phonenumber: user.phonenumber,
                isAdmin: user.isAdmin,
            }, token
        })
    }

    catch (error) {
        res.status(400).json({ error: 'error in logging in' })
    }
})

//forgot-password 
router.post('/forgot-password', async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).json({ mssg: 'email is required' })
        }
        if (!answer) {
            res.status(400).json({ mssg: 'answer is required' })
        }
        if (!newPassword) {
            res.status(400).json({ mssg: 'new password is required' })
        }
        // checking if email and answer are matching
        const user = await User.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(400).json({ mssg: 'wrong email or answer' })
        }
        const hashed = await hashpassword(newPassword) //hashing password
        await User.findByIdAndUpdate(user._id, { password: hashed }) //passing hashed password into password field.
        res.status(200).json({ mssg: 'password reset successfully' })


    } catch (error) {
        console.log(error)
        res.status(400).json({ mssg: 'something went wrong in forgot password' })
    }
})

//protected user route
router.get('/user-route', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

//protected admin route
router.get('/admin-route', requireSignIn, isadmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//update user profile
router.put('/profile', requireSignIn, async (req, res) => {
    try {
        const { firstname, lastname, email, address, phonenumber, password } = req.body //getting all these from user(frontend)
        const user = await User.findById(req.user._id) //finding user by id
        
        //hashing password if found
        const hashedPassword = password ? await hashpassword(password) : undefined //if password in not changed it means it is undefined
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            address: address || user.address,
            phonenumber: phonenumber || user.phonenumber,
            password: hashedPassword || user.password,
        },
            { new: true })
        res.status(200).send({ success: true, message: 'user profile updated successfully', updatedUser })
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: 'error in updating user profile', error })
    }
})

//orders 
router.get('/orders', requireSignIn, async (req,res)=> {
    try {
        const orders = await Order.find({buyer:req.user._id})
        .populate("products", "-photo")
        .populate("buyer", "firstname");
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:"error in showing orders", error})
    }
})

// All orders in admin dashboard 
router.get('/all-orders', requireSignIn, isadmin, async (req,res) => {
    try {
        const orders = await Order.find({})
        .populate("products", "-photo")
        .populate("buyer", "firstname")
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:"error in showing all orders", error})
    }
})

//order Status
router.put('/order-status/:OrderId', requireSignIn, isadmin, async (req,res)=> {
    try {
        const {OrderId} = req.params
        const {status} = req.body
        const orders = await Order.findByIdAndUpdate(OrderId, {status}, {new:true})
        res.json(orders);

    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"error to update order status", error})
    }
})


module.exports = router;