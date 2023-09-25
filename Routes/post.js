import express from "express";
const router = express.Router();
import Post from "../Models/Post.js";

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Cannot Update!");
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json("updated");
      } catch (error) {
        res.status(404).json("Cannot Update");
      }
    } else {
      res.status(401).json("You can only update your own post");
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//DELETE POST

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("post has been deleted");
      } catch (error) {
        res.status(404).json("Cannot delete");
      }
    } else {
      res.status(401).json("You can only delete your own post");
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//GET USER

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json("Cannot get the post")
    }
})


//GET ALLPOST

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
         let posts;
         if(username){
            posts = await Post.find({username})
         }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
         } else{
            posts = await Post.find();
         }
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json("Cannot get the post")
    }
})

export default router;
