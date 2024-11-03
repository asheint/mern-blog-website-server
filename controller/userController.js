// ==================== REGISTER A NEW USER
// POST : api/users/register
// UNPROTECTED
const registerUser = (req, res, next) => {
  res.jsons("Register User");
};

// ==================== LOGIN A REGISTERED USER
// POST : api/users/login
// UNPROTECTED
const loginUser = (req, res, next) => {
  res.jsons("Login User");
};

// ==================== USER PROFILE
// POST : api/users/:id
// UNPROTECTED
const getUser = (req, res, next) => {
  res.jsons("User Profile");
};

// ==================== CHANGE USER AVATAR
// POST : api/users/change-avatar
// UNPROTECTED
const changeAvatar = (req, res, next) => {
  res.jsons("Change user avatar");
};

// ==================== EDIT USER DETAILS (from profile)
// POST : api/users/edit-user
// UNPROTECTED
const editUser = (req, res, next) => {
  res.jsons("Edit user details");
};

// ==================== GET AUTHORS
// POST : api/users/authors
// UNPROTECTED
const getAuthors = (req, res, next) => {
  res.jsons("Get all users/authors");
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
