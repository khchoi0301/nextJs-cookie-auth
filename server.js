const next = require("next");
const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 5000;
const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated'
const COOKIE_SECRET = "whateverIwantTosay"
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !dev,
    signed: true,
}

const authenticate = async (email, password) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data.find(user => {
        if (user.email === email && user.website === password) {
            return user
        }
    })
}

app.prepare().then(() => {
    const server = express()

    server.use(express.json())

    server.use(cookieParser(COOKIE_SECRET))

    server.post('/api/login', async (req, res) => {
        const { email, password } = req.body;

        const user = await authenticate(email, password)

        if (!user) {
            return res.status(403).send("Invaild email or password")
        }

        const userData = {
            name: user.name,
            emmail: user.email,
            type: AUTH_USER_TYPE
        }
        res.cookie('token', userData, COOKIE_OPTIONS);
        res.json(userData)
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Listen on PORT ${port}`);
    })
})