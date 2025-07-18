import User from "../models/User.js";


export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Invalid user ID" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImage, dateOfBirth } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create and save new user (password is hashed in model)
    const newUser = new User({ name, email, password, profileImage, dateOfBirth });
    const savedUser = await newUser.save();

    const userToReturn = { ...savedUser._doc };
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const userToReturn = { ...user._doc };
    delete userToReturn.password;

    res.status(200).json({ message: "Login successful", user: userToReturn });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Login failed" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    if (password) {
      return res.status(400).json({ error: "Password cannot be updated here" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user" });
  }
};
