const express = require('express'),
      router = express.Router(),
      passport = require("passport");
router.get('/', async function(req, res) {
  let client = req.bot;
  res.render('index.ejs', {
    login : (req.isAuthenticated() ? 'si' : 'no'),
    textLogin: (req.isAuthenticated() ? `${req.user.username}` : 'Login'),
    textDash: (req.isAuthenticated() ? "Dashboard" : 'Login'),
    user: req.user,
    ApiDiscord: client
  })
})
.get('/api/login', passport.authenticate("discord", { failureRedirect: "/" }),  function(req, res) {
  res.redirect('/dashboard');
})
.get("/logout", async function(req, res) {
  await req.logout();
  res.redirect("/");
})
module.exports = router;