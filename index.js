import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import postRoute from './Routes/post.js';
import categoriesRoute from './Routes/category.js';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url'; 
import path from "path";
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to db");
  } catch (error) {
    handleError(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);


app.listen(process.env.PORT||5000, () => {
  connect();
  console.log(`backend is running on port 5000`);
});
