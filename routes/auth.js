const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.js');


const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        // Log the login attempt
        console.log(`Login attempt: Username - ${req.body.username}`);

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(400).send('User not found');
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            console.log('Login successful');
            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            console.log('Login failed: Invalid password');
            res.status(400).send('Invalid password');
        }
    } catch (error) {
        console.log(`Login error: ${error.message}`);
        res.status(500).send(error.message);
    }
});



module.exports = router;