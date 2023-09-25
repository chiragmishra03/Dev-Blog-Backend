import express from "express";
const router = express.Router();
import User from "../Models/User.js";
import bcrypt from 'bcrypt'
import Post from '../Models/Post.js'


//UPDATE USER
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new:true})
            res.status(200).json("Updated");
        } catch (err) {
            res.status(500).send("not successfull");
        }
    } else {
        res.send(401).json("You can only update your own account!")
    }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id)
                  res.status(200).json("User has been Deleted");
              } catch (err) {
                  res.status(500).send("not successfull");
              }
        }
        catch(err){res.status(404).json("User not found")}
    } else {
        res.send(401).json("You can only delete your own account!")
    }
});


//GET USER

router.get("/:id" , async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password , ...others} = users._doc
        res.status(200).json(others);

    }catch(error){
        res.status(404).json("Cannot get this user")
    }
})


export default router;
