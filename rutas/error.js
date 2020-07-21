const express = require('express');
const router = express.Router();
//const CheckAuth = require('../auth/auth');
router.get('/', async function(req, res) {
    res.render("error404.ejs", {
        textLogin: (req.isAuthenticated() ? `${req.user.username}` : 'Login'),
        ApiDiscord: req.bot,
        user: req.user,
        login: (req.isAuthenticated() ? "si": "no"),
        invite: `https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=0&scope=bot`
    });
  })

module.exports = router;