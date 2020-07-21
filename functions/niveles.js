const megadb = require("megadb");
const level_db = new megadb.crearDB('niveles')
let cooldownniveles = new Map();
module.exports = {
nivelesFunc: async (message) => {
if(cooldownniveles.has(message.guild.id+message.author.id)) {
  let cooldown = cooldownniveles.get(message.guild.id+message.author.id)
  if(Date.now() < cooldown) {
return;
}
  }
    if(!level_db.has(message.guild.id)) level_db.establecer(message.guild.id, {})
    if(!level_db.has(`${message.guild.id}.${message.author.id}`)) level_db.set(`${message.guild.id}.${message.author.id}`, {xp: 0, lvl: 1})
    let { xp, lvl } = await level_db.get(`${message.guild.id}.${message.author.id}`)
    let randomxp = Math.floor(Math.random() * 8) + 1
    let lvlup = 5 * (lvl ** 2) + 20 * lvl + 30
    if(message.author.bot) return;
    cooldownniveles.set(message.guild.id+message.author.id, Date.now() + 10000) 
    
    if((xp + randomxp) >= lvlup) {
      level_db.set(`${message.guild.id}.${message.author.id}`, {xp: 0,lvl: parseInt(lvl+1)})
        return message.channel.send(`Felicidades ${message.author.tag}, Subiste al nivel ${parseInt(lvl+1)}!`);
    }else{
      level_db.add(`${message.guild.id}.${message.author.id}.xp`, randomxp)
      return;
    }    
},
  getRank: (users, message) => {
    let userlist = []
    for(var key in users){
      let usuario = message.guild.members.cache.has(key) ? message.guild.members.cache.get(key).user.username : `Salio (${key})`
      userlist.push([usuario, users[key].lvl, users[key].xp])
    }
    
    userlist.sort((user1, user2) => {
      
      return user2[1] - user1[1] || user2[2] - user1[2];
    })
    return userlist;
  }
  
  
}