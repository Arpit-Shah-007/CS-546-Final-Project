import bcrypt from "bcryptjs";
import User from '../models/user.model.js'
import { generateImageUrl } from "../helper/utils.js";
import Project from "../models/projects.models.js";
import Likes from "../models/likes.models.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const profile = req.file ? req.file.filename : null;
        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: false, msg: 'Invalid email format' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, msg: 'Email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, role: role ? role : 'user', profilePic: profile });
        await newUser.save();

        return res.status(201).json({ status: true, msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // If user not found
        if (!user) {
            return res.status(401).json({ status: false, msg: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: false, msg: 'Invalid email or password' });
        }

        // If email and password are correct, generate JWT token
        const payload = {
            user: {
                _id: user._id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                throw err;
            }
            return res.json({ status: true, msg: "Login successful", token });
        });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Forgot password endpoint
export const forgotPass = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // If user not found
        if (!user) {
            return res.status(404).json({ status: false, msg: 'User not found' });
        }

        // Generate reset token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Update user with reset token and expiry
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email with reset link (You need to implement this part)

        return res.status(200).json({ status: true, msg: 'Password reset email sent successfully', token });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
// Reset password endpoint
export const resetPass = async (req, res) => {
    try {
        let token = req.params.token
        const { password } = req.body;

        // Find user by reset token
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        // If token is invalid or expired
        if (!user) {
            return res.status(400).json({ status: fakse, msg: 'Invalid or expired reset token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({ status: true, msg: 'Password reset successful' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const getProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user._id });
        user = JSON.parse(JSON.stringify(user))
        user.profilePic = user.profilePic && user.profilePic != "" ? generateImageUrl(user.profilePic) : ""
        const top3Latest = await Project.find({ author: req.user._id }).sort({ datePosted: -1 }).limit(3);
        const top3Liked = await Project.find({ author: req.user._id }).sort({ likesCount: -1 }).limit(3);
        const states = {
            totalVideos: await Project.countDocuments({ author: req.user._id }),
            totalLiked: await Likes.countDocuments({ userId: req.user._id, type: "like" }),
            totalDisLiked: await Likes.countDocuments({ userId: req.user._id, type: "dislike" })
        }
        return res.status(200).send({ status: true, msg: "Profile fetched", data: { ...user, top3Latest, top3Liked, states } })
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}