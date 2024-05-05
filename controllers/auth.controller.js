import { userData } from "../data/index.js";

export const register = async (req, res) => {
  try {
    //console.log(req.body)
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      // profilePic,
      //role,
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
    // if (!profilePic) {
    //   throw "ProfilePic is required";
    // }
    // if (!role) {
    //   throw "Role is required";
    // }
    
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
    console.log("3")
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

    // if (typeof role !== "string" || role.trim().length === 0) {
    //   throw "Invalid role";
    // }

    // if (
    //   role.trim().toLowerCase() !== "admin" &&
    //   role.trim().toLowerCase() !== "user"
    // ) {
    //   throw "Invalid role. It should be either admin or user";
    // }
    const profilePic = "https://avatar.iran.liara.run/public"
    const role = "user";
    
    const result = await userData.registerUser(
      firstName,
      lastName,
      email,
      password,
      profilePic,
      role
    );
    
    if (!result) {
      console.log("fail")
      res.status(500).render("error", {
        title: "Error Page",
        status: 500,
        message: "Internal Server Error",
      });
    }
    res.redirect("/auth/login");
  } catch (error) {
    res.status(400).json({error: error});
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
    // console.log(token)
    // res.status(200).json(token)
    res.redirect("http://localhost:3000/home");
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
