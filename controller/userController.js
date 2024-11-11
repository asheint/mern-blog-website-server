const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const HttpError = require("../models/errorModel");
const { hash } = require("crypto");

// ==================== REGISTER A NEW USER
// POST : api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    const newEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists.", 422));
    }
    if (password.trim().length < 6) {
      return next(
        new HttpError("Password should be at least 6 characters.", 422)
      );
    }
    if (password != password2) {
      return next(new HttpError("Password do not match.", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPass,
    });
    res.status(201).json(`New user ${newUser.email} registered.`);
  } catch (error) {
    return next(new HttpError("User registration failed.", 422));
  }
};

// ==================== LOGIN A REGISTERED USER
// POST : api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Fill in all fields.", 422));
    }
    const newEmail = email.toLowerCase();

    const user = await User.findOne({ email: newEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials.", 422));
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return next(new HttpError("Invalid credentials.", 422));
    }

    const { _id: id, name } = user;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(
      new HttpError("Login failed. Please check your credentials.", 422)
    );
  }
};

// ==================== USER PROFILE
// POST : api/users/:id
// UNPROTECTED
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ==================== CHANGE USER AVATAR
// POST : api/users/change-avatar
// UNPROTECTED
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("Please choose and image", 422));
    }

    // Find user from database
    const user = await User.findById(req.user.id);

    // Delete previous avatar
    if (user.avatar) {
      fs.unlink(path.join(__dirname, `../uploads/${user.avatar}`), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }

    const { avatar } = req.files;
    // check file size
    if (avatar.size > 500000) {
      return next(new HttpError("Image size too large.", 422));
    }
    let fileName;
    fileName = avatar.name;
    let splittedFileName = fileName.split(".");
    let newFileName =
      splittedFileName[0] +
      uuidv4() +
      "." +
      splittedFileName[splittedFileName.length - 1];
    avatar.mv(
      path.join(__dirname, `../uploads/${newFileName}`),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        }

        const updatedAvatar = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFileName },
          { new: true }
        );

        if (!updatedAvatar) {
          return next(new HttpError("Avatar update failed.", 422));
        }
        res.status(200).json(updatedAvatar);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ==================== EDIT USER DETAILS (from profile)
// POST : api/users/edit-user
// UNPROTECTED
const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;
    if (!name || !email || !currentPassword || !newPassword) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    // get user from database
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    // make sure new email does not exist
    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists.id !== req.user.id) {
      return next(new HttpError("Email already exists.", 422));
    }

    // compare current password and db passeord
    const validdateUserPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!validdateUserPassword) {
      return next(new HttpError("Invalid current password.", 422));
    }

    // compare new passwords
    if (newPassword !== confirmNewPassword) {
      return next(new HttpError("Passwords do not match.", 422));
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // update user newInfo in database
    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password: hash },
      { new: true }
    );
    res.status(200).json(newInfo);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ==================== GET AUTHORS
// POST : api/users/authors
// UNPROTECTED
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    res.json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
