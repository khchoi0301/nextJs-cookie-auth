const next = require("next");
const express = require("express");

const dev = process.env.NODE_ENV !== "production"
const port = process.env.PORT || 5000;
const app = next({ dev })
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express()

    server.use(express.json())

    server.post('/api/login', (req, res) => {
        const { email, password } = req.body;

        AuthenticatorResponse(email, password)
        res.json({
            email,
            password,
            sucess: true,
        })
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Listen on PORT ${port}`);
    })
})