const express = require('express'),
 router = express.Router(),
 passport = require("passport"),
 {crearDB} = require("megadb"),
 opciones = new crearDB('opciones'),
 lvl = new crearDB('niveles'),
 auth = require("../functions/auth.js");
router.get('/', auth, async function(req, res) {
      let datoServidores = req.user.guilds.filter(p => (p.permissions & 2146958591) === 2146958591);
  res.render('dashboard.ejs', {
    login : (req.isAuthenticated() ? 'si' : 'no'),
    textLogin: (req.isAuthenticated() ? req.user.username : 'Login'),
    guilds: datoServidores,
    user: req.user,
    client: req.bot
  })
})
.get('/:id', auth, async function(req, res) {
  let idserver = req.params.id,
      datoServer = req.bot.guilds.cache.get(idserver)
    if(!datoServer) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot&response_type=code&guild_id=${idserver}`)
    if(!datoServer.available) return res.redirect("../error01")
    if(!lvl.has(datoServer.id)) lvl.establecer(datoServer.id, {})
    
res.render('server.ejs', {
    login : (req.isAuthenticated() ? 'si' : 'no'),
    textLogin: (req.isAuthenticated() ? `${req.user.username}` : 'Login'),
    user: req.user,
    guild: datoServer,
    opciones: new req.megadb.crearDB("opciones"),
    prefix: opciones.has(`${datoServer.id}.prefix`) ? await opciones.get(`${datoServer.id}.prefix`) : process.env.prefix,
    client: req.bot,
    bans: await datoServer.fetchBans().then(x => {return x.size}),
    usuarios: getRank(await lvl.get(idserver), datoServer)
  
  })
})
.post('/:id/welcome', auth, async(req, res) => {
    let idserver = req.params.id,
        id_channel = req.body.channel_ID;
if(!id_channel || id_channel === "no_select") {
    await opciones.delete(`${idserver}.channel.welcome`);
    await res.redirect(`/dashboard/${idserver}`);
}else {
    await opciones.set(`${idserver}.channel.welcome`, id_channel);
    await res.redirect(`/dashboard/${idserver}`);
}
})
.post('/:id/rolauto', auth, async(req, res) => {
    let idserver = req.params.id,
        id_role = req.body.rol_ID;
if(!id_role || id_role === "no_select") {
    await opciones.delete(`${idserver}.role`);
    await res.redirect(`/dashboard/${idserver}`);
}else {
    await opciones.set(`${idserver}.role`, id_role);
    return await res.redirect(`/dashboard/${idserver}`); 
}
})
.post('/:id/prefix', auth, async(req, res) => {
    let idserver = req.params.id,
         newPrefix = req.body.newPrefix;
if(!newPrefix || newPrefix.lenght === 0) {
    await opciones.delete(`${idserver}.role`);
    await res.redirect(`/dashboard/${idserver}`);
}else {
    await opciones.set(`${idserver}.prefix`, newPrefix);
    await res.redirect(`/dashboard/${idserver}`);
}
}).post('/:id/logs', auth, async(req, res) => {
    let idserver = req.params.id,
         logs_ID = req.body.logs_ID;
if(!logs_ID || logs_ID === "no_select") {
    await opciones.delete(`${idserver}.logs`);
    await res.redirect(`/dashboard/${idserver}`);
}else {
    await opciones.set(`${idserver}.channels.logs`, logs_ID);
    await res.redirect(`/dashboard/${idserver}`);
}
});
function getRank (users, datoServer) {
    let userlist = []
    for(var key in users){
      let usuario = datoServer.members.cache.has(key) ? datoServer.members.cache.get(key).user.username : `Salió (${key})`
      userlist.push([usuario, users[key].lvl, users[key].xp])
    }
    
    userlist.sort((user1, user2) => {
      
      return user2[1] - user1[1] || user2[2] - user1[2];
    })
    return userlist;
  }
module.exports = router;