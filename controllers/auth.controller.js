import { userData } from "../data/index.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      profilePic,
      role,
    } = req.body;

    if (!firstName) {
      throw "FirstName is required";
    }
    if (!lastName) {
      throw "LastName is required";
    }
    if (!email) {
      throw "Email is required";
    }
    if (!password) {
      throw "Password is required";
    }
    if (!confirmPassword) {
      throw "ConfirmPassword is required";
    }
    if (!profilePic) {
      throw "ProfilePic is required";
    }
    if (!role) {
      throw "Role is required";
    }

    if (
      typeof firstName !== "string" ||
      firstName.trim().length === 0 ||
      !/^[a-zA-Z]{2,25}$/.test(firstName.trim())
    ) {
      throw "Invalid firstName";
    }

    if (
      typeof lastName !== "string" ||
      lastName.trim().length === 0 ||
      !/^[a-zA-Z]{2,25}$/.test(lastName.trim())
    ) {
      throw "Invalid lastName";
    }

    if (
      typeof email !== "string" ||
      email.trim().length === 0 ||
      !/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email.trim().toLowerCase())
    ) {
      throw "Invalid email";
    }

    if (
      typeof password !== "string" ||
      password.trim().length === 0 ||
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/.test(password.trim())
    ) {
      throw "Invalid password";
    }

    if (confirmPassword.trim() !== password.trim()) {
      throw "Passwords do not match";
    }

    if (typeof role !== "string" || role.trim().length === 0) {
      throw "Invalid role";
    }

    if (
      role.trim().toLowerCase() !== "admin" &&
      role.trim().toLowerCase() !== "user"
    ) {
      throw "Invalid role. It should be either admin or user";
    }

    const result = await userData.registerUser(
      firstName,
      lastName,
      email,
      password,
      profilePic,
      role
    );

    if (!result) {
      res.status(500).render("error", {
        title: "Error Page",
        status: 500,
        message: "Internal Server Error",
      });
    }
    res.redirect("/auth/login");
  } catch (error) {
    res.status(400).render("register", {
      title: "Register",
      hasErrors: true,
      error: error.message || error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw "Email is required";
    }
    if (!password) {
      throw "Password is required";
    }

    if (
      typeof email !== "string" ||
      email.trim().length === 0 ||
      !/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email.trim().toLowerCase())
    ) {
      throw "Invalid email";
    }

    if (
      typeof password !== "string" ||
      password.trim().length === 0 ||
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/.test(password.trim())
    ) {
      throw "Invalid password";
    }

    const token = await userData.loginUser(email, password);
    if (!token) {
      throw "Invalid username or password";
    }
    res.cookie("token", token);
    res.redirect("/home");
  } catch (error) {
    res.status(400).render("login", {
      title: "Login",
      hasErrors: true,
      error: error.message || error,
    });
  }
};

export const logout = async (req, res) => {
  if (req.cookies.token) {
    res.clearCookie("token");
    res.render("logout", { title: "Logout" });
  } else {
    res.redirect("/auth/login");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.send({ Status: "User not existed" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      // const token = req.cookies.token?.token;
      // console.log(token);

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      // console.log(process.env.EMAIL_USER);
      // console.log(process.env.EMAIL_PASS);
      // console.log(user.email);
      const userId = user._id.toString();
      console.log(userId);

      var mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Reset Password Link",
        text: `http://localhost:3000/auth/reset-password/${userId}/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.send({ Status: "Success" });
        }
      });
      // console.log("Email sent");
    });
  } catch (error) {
    // console.log(error);
    // console.log(error.message);
    res.status(400).render("resetPassword", {
      title: "Reset Password",
      hasErrors: true,
      error: error.message || error,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    console.log("changePassword");
    const { id, token } = req.params;
    const { password } = req.body;

    if (!password) {
      throw "Password is required";
    }

    if (
      typeof password !== "string" ||
      password.trim().length === 0 ||
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/.test(password.trim())
    ) {
      throw "Invalid password";
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ Status: "Invalid token" });
      } else {
        bcrypt.hash(password, 10).then((hash) => {
          User.findOneAndUpdate({ _id: id }, { password: hash })
            .then((user) => res.send({ Status: "Success" }))
            .catch((error) => res.send({ Status: "Error" }));
        });
      }
    });
  } catch (error) {
    res.status(400).render("changePassword", {
      title: "Change Password",
      hasErrors: true,
      error: error.message || error,
    });
  }
};
//   try {
//     const { id, token } = req.params;
//     const { password } = req.body;

//     // Check if password is provided and valid
//     if (!password) {
//       throw "Password is required";
//     }

//     if (
//       typeof password !== "string" ||
//       password.trim().length === 0 ||
//       !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/.test(password.trim())
//     ) {
//       throw "Invalid password";
//     }

//     // Verify the token
//     jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//       if (err) {
//         return res.json({ status: "Invalid token" });
//       } else {
//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update user's password in the database
//         User.findByIdAndUpdate(
//           id,
//           { password: hashedPassword },
//           { new: true }, // Return the updated user object
//           (updateErr, updatedUser) => {
//             if (updateErr) {
//               return res.json({ status: "Error updating password" });
//             } else {
//               return res.json({ status: "Password updated successfully" });
//             }
//           }
//         );
//       }
//     });
//   } catch (error) {
//     res.status(400).json({ status: "Error", message: error.message || error });
//   }
// };
