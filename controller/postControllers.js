// ============================= CREATE A POST
// POST : api/posts
// PROTECTED

const createPost = async (req, res, next) => {
  res.json("Create Post");
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
