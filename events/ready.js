var request = require("request");
const express = require('express'),
 app = express(),
 mcIP = "play.vuelocraft.net",
 pingURL = "https://api.minetools.eu/ping/" + mcIP,
 {crearDB} = require("megadb"),
  cooldown = new crearDB("cooldownmute");

module.exports = async client => {
  setInterval(function() {
    iteracion_mute();
  }, 1000);
   let statues = [`w!help |  ${client.users.cache.size.toLocaleString()} users!`,"BahianoDevelopments " + require("../package.json").version,
                 "walterio.glitch.me","walterio-add.tk","walterio-web.glitch.me","EL RISAS#5473"];
  setInterval(function() {
    let status = statues[Math.floor(Math.random() * (statues.length - 1) + 1)];
    client.user.setPresence({ activity: { name: status, type: "WATCHING" }, status: "online"});
  }, 20000);
function iteracion_mute() {
cooldown.datos().then(async guilds => {
for(var guild_id in guilds) {
let servidor = client.guilds.cache.get(guild_id)
if(!servidor) {
      cooldown.delete(guild_id)
      continue
      }
    let muted_role = servidor.roles.cache.find(r => r.name == "Muted")
    for(var user_id in guilds[guild_id]){
      let member = servidor.members.cache.get(user_id)
      if(!member) {
        if(await cooldown.get(`${guild_id}.${user_id}.mute`) <= 0)
      cooldown.delete(`${guild_id}.${user_id}`)
      continue
        }
    if(Date.now() >= guilds[guild_id][user_id].mute){
        if(muted_role && member.roles.cache.has(muted_role.id)){
            member.roles.remove(muted_role.id).catch(err => console.log(err.message));
            client.channels.cache.get(await cooldown.get(`${guild_id}.${user_id}.channel`)).send(`termino el mute de ${member}`)
          }
          cooldown.delete(`${guild_id}.${user_id}`)
        }else if(Date.now() <= guilds[guild_id][user_id].mute){
        if(muted_role && !(member.roles.cache.has(muted_role.id))){
            member.roles.add(muted_role.id).catch(err => console.log(`${err.message} ${member} ${guild_id}`));
          }
        }
      }
    }
  })
}
}