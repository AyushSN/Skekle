const nodemailer = require('nodemailer'); 
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const sendVerification = async (email,req,res) => {
    try { 
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        })
        const [results] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);

        if (results.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }

        let token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await connection.query("INSERT INTO users (email, token) VALUES (?, ?)", [email, token]);

        const verificationLink = `http://localhost:4000/customers/verify?token=${token}`;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your email",
            text: `Click the link to verify your email: ${verificationLink}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send("Verification email sent.");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

const verifyEmail = async (token,req,res) => {
    if (!token) {
        return res.status(400).send("Token is missing.");
    }

    try {
        const connection = await mysql.createConnection({ 
            host: process.env.HOST, 
            user: process.env.USER, 
            password: process.env.PASSWORD, 
            database: process.env.DATABASE
        });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const [results] = await connection.query("SELECT * FROM users WHERE email = ? AND token = ?", [email, token]);

        if (results.length === 0) {
            return res.status(400).send("Invalid verification link.");
        }

        await connection.query("UPDATE users SET verified = true WHERE email = ?", [email]);
        res.status(200).send(`Email ${email} verified successfully.`);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send("Invalid token.");
    }
};

module.exports = {
    sendVerification,
    verifyEmail
};
