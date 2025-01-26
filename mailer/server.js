// const express = require('express'); 
// const nodemailer = require('nodemailer'); 
// const dotenv = require('dotenv'); 
// const mysql = require('mysql2/promise');
// const jwt = require('jsonwebtoken');

// dotenv.config();

// const app = express();
// const port = 3000;

// // need to remove this
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// let connection;
// (async () => {
//     try {
//         connection = await mysql.createPool({
//             host: process.env.HOST,
//             user: process.env.USER,
//             password: process.env.PASSWORD,
//             database: process.env.DATABASE
//         });
//         console.log("MySQL connection established successfully");
//     } catch (error) {
//         console.error("Error connecting to MySQL:", error.message);
//     }
// })();

// app.post("/send-verification", async (req, res) => {
//     const { email } = req.body;

//     try {
//         const [results] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);

//         if (results.length > 0) {
//             return res.status(400).json({ error: "Email already exists." });
//         }

//         let token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         await connection.query("INSERT INTO users (email, token) VALUES (?, ?)", [email, token]);

//         const verificationLink = `http://localhost:3000/verify?token=${token}`;
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: "Verify your email",
//             text: `Click the link to verify your email: ${verificationLink}`,
//         };

//         await transporter.sendMail(mailOptions);
//         res.status(200).send("Verification email sent.");
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal server error." });
//     }
// });

// app.get("/verify", async (req, res) => {
//     const { token } = req.query;

//     if (!token) {
//         return res.status(400).send("Token is missing.");
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const { email } = decoded;

//         const [results] = await connection.query("SELECT * FROM users WHERE email = ? AND token = ?", [email, token]);

//         if (results.length === 0) {
//             return res.status(400).send("Invalid verification link.");
//         }

//         await connection.query("UPDATE users SET verified = true WHERE email = ?", [email]);
//         res.status(200).send(`Email ${email} verified successfully.`);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(400).send("Invalid token.");
//     }
// });

