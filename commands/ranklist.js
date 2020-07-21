const megadb = require("megadb");
const {getRank} = require('../functions/niveles.js')
const level_db = new megadb.crearDB('niveles')
module.exports = async (client, message, args, ops) => {
    if(!level_db.has(message.guild.id)) level_db.establecer(message.guild.id, {})
    if(!level_db.has(`${message.guild.id}.${message.author.id}`)) level_db.set(`${message.guild.id}.${message.author.id}`, {xp: 0, lvl: 1})
  
  let usuarios = getRank(await level_db.get(message.guild.id), message)
  usuarios.map((usuario, index) => usuarios[index] = `> #${index+1} ${usuario[0]} | LVL: ${usuario[1]} | XP: ${usuario[2]}/${5 * (usuario[1] ** 2) + 20 * usuario[1] + 30}`)
  let paginas = []
  let cantidad = 15
  while(usuarios.length > 0) {
    paginas.push(usuarios.splice(0, cantidad))
}
  const embed = new ops.Discord.MessageEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL({dynamic:true}))
  if(!args[0]){
    embed.setDescription(`Ranklist del servidor ${message.guild.name} (pagina 1 de ${paginas.length})\n\n${paginas[0].join("\n")}`)
    return message.channel.send(embed)
}
  if(isNaN(args[0])) return message.channel.send("Necesitas ingresar el numero de la pagina")
  let seleccion = parseInt(args[0])
  if(seleccion <= 0 || seleccion > paginas.length) return message.channel.send(`La pagina ${seleccion} no existe.`)
  embed.setDescription(`Ranklist del servidor ${message.guild.name} (pagina ${seleccion} de ${paginas.length})\n\n${paginas[seleccion-1].join("\n")}`)
  return message.channel.send(embed)
} 