const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { User, BusinessProfile } = require("../models");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Signup
exports.signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const lastUser = await User.findOne({ order: [["createdAt", "DESC"]] });
    let nextId = 1;
    if (lastUser && lastUser.user_id) {
      const lastIdNum = parseInt(lastUser.user_id.replace("USR-", ""), 10);
      nextId = lastIdNum + 1;
    }
    const userId = `USR-${String(nextId).padStart(8, "0")}`;
    // generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    // create user
    const user = await User.create({
      user_id: userId,
      full_name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    // create business profile
    await BusinessProfile.create({
      user_id: user.user_id,
      full_name,
      email,
      phone_number: null,
      business_type: null,
      business_category: null,
      business_name: null,
      business_address: null,
      business_description: null,
    });

    // send verification email
    const verifyUrl = `http://localhost:5000/auth/verify?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account",
      html: `<p>Hi ${full_name},</p>
             <p>Thanks for signing up! Please verify your email by clicking below:</p>
             <a href="${verifyUrl}">Verify Email</a>`,
    });

    res.status(201).json({
      message:
        "User created successfully. Please check your email to verify your account.",
      user: {
        id: user.id,
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    console.log("Received token:", token); // debug

    const user = await User.findOne({ where: { verificationToken: token } });
    console.log("Found user:", user ? user.email : "none"); // debug

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before logging in." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
