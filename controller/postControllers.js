const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");

// ============================= CREATE A POST
// POST : api/posts
// PROTECTED

const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError("Fill in all fields and choose thumbnail", 422)
      );
    }
    const { thumbnail } = req.files;
    // check the file size
    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("Thumbnail too big. File should be less than 2mb. ")
      );
    }
    let fileName = thumbnail.name;
    let splittedFileName = fileName.split(".");
    let newFilename =
      splittedFileName[0] +
      uuid() +
      "." +
      splittedFileName[splittedFileName.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFilename,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post couldn't be created"), 422);
          }
          // find user and in crease post count by 1
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ============================= GET ALL POST
// POST : api/posts/:id
// UNPROTECTED

const getPosts = async (req, res, next) => {
  res.json("Get all Posts");
};

// ============================= GET SINGLEPOST
// POST : api/posts
// UNPROTECTED

const getPost = async (req, res, next) => {
  res.json("Get single Post");
};

// ============================= GET POSY BY POST CATEGORY
// POST : api/posts/categories/:category
// UNPROTECTED

const getCatPosts = async (req, res, next) => {
  res.json("Get posts by category");
};

// ============================= GET USER/AUTHOR POST
// POST : api/posts/users/:id
// UNPROTECTED

const getUserPosts = async (req, res, next) => {
  res.json("Get user posts");
};

// ============================= EDIT POST
// PATCH : api/posts/:id
// PROTECTED

const editPost = async (req, res, next) => {
  res.json("Edit post");
};

// ============================= DELETE POST
// DELETE : api/posts/users/:id
// PROTECTED

const deletePost = async (req, res, next) => {
  res.json("Delete post");
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
};
