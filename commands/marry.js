const {crearDB} = require("megadb"),
commandcooldown = new Map(),
db = new crearDB('marrys'),
moment = require("moment");
require('moment-duration-format');
  module.exports = async (client, message, args, ops) => {
let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)

  if(db.has(`${message.author.id}.id`)) 
    return message.channel.send(`${ops.lang.commands.marry.married} ${await db.get(`${message.author.id}.tag`)}`)
    
  if(!user) return message.channel.send(ops.lang.no_user)
    
  if(message.author.bot) return;
  if(user.bot) return message.channel.send(ops.lang.commands.marry.bot)
  
    if(user.id === message.author.id) return message.channel.send(ops.lang.commands.marry.yourself)
    
  if(db.has(`${message.guild.id}.${user.id}.id`)) 
    return message.channel.send(ops.lang.commands.marry.another_married)
    
  if (commandcooldown.has(message.author.id)) {
      let cooldown = commandcooldown.get(message.author.id);
      if (Date.now() < cooldown) {
        const duracion = moment.duration(cooldown - Date.now()).format("m [m], s [s]");
        return message.channel.send(`${ops.lang.commands.marry.cooldown} **${duracion}** ${ops.lang.commands.marry.cooldown2}`);
      }
    }
    commandcooldown.set(message.author.id, Date.now() + 120000);
message.channel.send(`:mega:**${user.username}**, ${ops.lang.commands.marry.request} **${message.author.username}**\n:stopwatch: ${ops.lang.commands.marry.expire}`)
    const filter = m => m.author.id === user.id && (m.content.startsWith('yes') || m.content.startsWith('no'));
message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] }).then(async collected => {
    if (collected.first().content.toLowerCase() === "yes") {
      await db.set(`${user.id}.id`, message.author.id)
      await db.set(`${message.author.id}.id`, user.id)
      await db.set(`${user.id}.tag`, message.author.tag)
      await db.set(`${message.author.id}.tag`, user.tag)
   return message.channel.send(`${ops.lang.commands.marry.sucess} ${user.username} ${ops.lang.commands.marry.sucess2} ${message.author.username}!`)
}else if (collected.first().content.toLowerCase() === "no") {
   return message.channel.send(`Uhh, ${user.username} ${ops.lang.commands.marry.unsucess} ${message.author.username}!`)
}
}).catch(collected => message.channel.send(`${user.tag} ${ops.lang.commands.marry.expired}`))
}
