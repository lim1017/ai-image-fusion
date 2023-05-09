import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 10;

    const count = await Post.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const startIndex = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    res
      .status(200)
      .json({ success: true, data: posts, currentPage: page, totalPages });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const photoURL = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({ name, prompt, photo: photoURL.url });

    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.log(err, "errrrrrrrrrrrrr");
    res.status(500).json({ success: true, message: err });
  }
});

export default router;
