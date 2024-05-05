const express = require('express')
const mongoose = require('mongoose')
const {Category} = require('../models/CategoryModel')
const {requireSignIn, isadmin} = require('../middlewares/authmiddleware')
const slugify = require('slugify')

const router = express.Router()

//create category
router.post('/create-category',requireSignIn, isadmin,async (req,res)=> {
    try{
        const {name}= req.body;
        if(!name){
            return res.status(401).send({message:'name is required'})
        }
        const existingname = await Category.findOne({name})
        if(existingname){
            return res.status(200).send({success:true,message:'category already exists'})
        }
       const createcategory = await new Category({name,slug:slugify(name)}).save()
       res.status(201).send({
        success: true,
        message:'new category created successfully',
        createcategory         //    response of createcategory variable prints 
       })
        
    }
    catch (error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"error in creating category"
        })
    }
    

})

//update category
router.put('/update-category/:id',requireSignIn,isadmin, async (req,res)=> {
    try{
        const {name}= req.body
        const {id} = req.params
        if(!name){
           return res.status(401).send({message:'fill in all fields'})
        }
        const existingname = await Category.findOne({name})
        if(existingname){
            return res.status(200).send({success:true,message:'category already exists'})
        }
        const updatecategory = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true}) //new property is to update the category page
        res.status(200).send({success: true, message:'category updated', updatecategory})
    } catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update request',
            error
        })
    }
})

//get all categories
router.get('/all-category', async (req,res)=>{
     try {
        const allcategory = await Category.find({}).sort({createdAt:-1});
         res.status(200).send({success:true,allcategory});
        
    } catch (error) {
        res.status(500).send({success:false,message:'error getting all categories',error})
    }
})

//get single category by slug
router.get('/single-category/:id',async (req,res)=>{
    const {id} = req.params
    try {
        const singlecategory = await Category.findById({_id:id})
        res.status(200).send({success:true,singlecategory})
    } catch (error) {
        res.status(400).send({success:false,messge:'error getting single category',error})
    }
})

// deleting single Category
router.delete('/delete-category/:id', requireSignIn, isadmin, async (req,res)=> {
        try {
            const {id} = req.params
            const deletecategory = await Category.findByIdAndDelete(id)
            res.status(200).send({success:true,message:'category deleted', deletecategory})
        } catch (error) {
            res.status(400).send({success:true,message:'error in deleting category',error})
        }
})

module.exports = router;