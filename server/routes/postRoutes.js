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
  secure: true,
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

    const securePosts = posts.map((post) => {
      const securePhotoUrl = post.photo.replace("http://", "https://");
      return { ...post._doc, photo: securePhotoUrl };
    });

    res
      .status(200)
      .json({
        success: true,
        data: securePosts,
        currentPage: page,
        totalPages,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    // const photoURL = await cloudinary.uploader.upload(photo);

    // const newPost = await Post.create({ name, prompt, photo: photoURL.url });

    const photoURL = await cloudinary.uploader.upload(photo, { secure: true });
    const securePhotoURL = photoURL.url.replace("http://", "https://");
    const newPost = await Post.create({ name, prompt, photo: securePhotoURL });

    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.log(err, "errrrrrrrrrrrrr");
    res.status(500).json({ success: true, message: err });
  }
});

export default router;
