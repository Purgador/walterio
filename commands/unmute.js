const {crearDB} = require("megadb"),
  cooldown = new crearDB("cooldownmute");
module.exports = async (client, message, args, ops) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No tienes permisos. `Gestionar Mensajes`");
  
  let tomute = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  if(!tomute) return message.channel.send("Menciona a alguien.");
  let muted = message.guild.member(tomute).roles.cache.find(r => r.name === "Muted");
  if(!muted) return message.channel.send("Este usuario no esta muteado");
  let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
  
      await cooldown.delete(`${message.guild.id}.${tomute.id}.mute`);
      await cooldown.delete(`${message.guild.id}.${tomute.id}.channel`)
    message.guild.member(tomute).roles.remove(muterole.id);
    message.channel.send(`${tomute.tag} Ha sido desmuteado!`);
}