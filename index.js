const express = require("express"),
  app = express(),
  Discord = require("discord.js"),
  client = new Discord.Client({disableEveryone: true, fetchAllMembers: true}),
  session = require("express-session"),
  passport = require("passport"),
  bodyparser = require("body-parser"),
  path = require("path"),
  fs = require("fs"),
  megadb = require("megadb"),
  { Strategy } = require("passport-discord");
client.eventos = new Discord.Collection();
for (const file of fs.readdirSync("./events/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3),
        fileContents = require(`./events/${file}`);
    client.on(fileName, fileContents.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
    client.eventos.set(fileName, fileContents);
  }
}
client.comandos = new Discord.Collection();
for(const file of fs.readdirSync("./commands/")){
 if(file.endsWith(".js")){
   let fileName = file.substring(0, file.length - 3), 
       fileContents = require(`./commands/${file}`);
   client.comandos.set(fileName, fileContents);
 }
}
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
let scopes = ["identify", "guilds"];
passport.use(new Strategy({ clientID: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, 
  callbackURL: `${process.env.URL}/api/login`,
  scope: scopes
},function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    return done(null, profile);
  });
}));
app.use(bodyparser.json()).use(bodyparser.urlencoded({ extended: true })).engine("html", require("ejs").renderFile)
.use(express.static(path.join(__dirname, "/public"))).set("view engine", "ejs")
.set("views", path.join(__dirname, "views")).set("port", process.env.PORT || 3000)
.use(session({secret: "caffe", resave: false, saveUninitialized: false})).use(passport.initialize()).use(passport.session())
.use(function(req, res, next) {
  req.bot = client;
  req.megadb = megadb;
    next();
}).use("/", require("./rutas/index")).use("/dashboard", require("./rutas/dashboard")).use("/error404", require("./rutas/error"))
.get("*", function(req, res) {
  res.redirect("/error404");
}).listen(process.env.PORT, function() {console.log("Your app is listening on port " + process.env.PORT);});
process.on("unhandledRejection", r => console.dir(r));
client.login(process.env.token).catch(err => console.error("Error al iniciar sesión: " + err));
