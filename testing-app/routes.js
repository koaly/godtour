const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "hello from backend",
        users: [
            { _id: 1, Email: "suck@gmail.com" },
            { _id: 2, Email: "suck2@gmail.com" },
        ]
    });
})
module.exports = router