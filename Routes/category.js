import express from "express";
const router = express.Router();
import Category from "../Models/Category.js";


router.post("/" , async(req,res)=>{
    const newCat = new Category(req.body);
    try{
        const savedCategory = await newCat.save();
        res.status(200).json(savedCategory);
    }catch(error){
        res.status(401).json("No such category")
    }
})

router.get("/" , async(req,res)=>{
    try{
        const cats = await Category.find();
        res.status(200).json(cats);
    }catch(error){
        res.status(401).json("No such category")
    }
})









export default router;
