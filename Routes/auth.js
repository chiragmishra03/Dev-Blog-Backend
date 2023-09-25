import express from "express"
const router = express.Router();
import User from "../Models/User.js";
import bcrypt from 'bcrypt'

router.post("/register" , async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })
        const user = await newUser.save();
        res.status(200).send("Successfull");
    } catch(err){
        res.status(500).send("not successfull");
    }
});


router.post("/login" , async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user)return res.status(400).send("Wrong Credentials");
        const validate = await bcrypt.compare(req.body.password , user.password);
        if(!validate) return res.status(400).send("Wrond Credentials");
        const {password , ...others} = user._doc;
        res.status(200).json(others);
    }catch(error){
        res.status(500).send("not successfull");
    }
})

export default router;