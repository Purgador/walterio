const megadb = require("megadb"),
 opciones = new megadb.crearDB('opciones');
module.exports = async (client, message, args, ops) => {
  if(!message.member.hasPermission('MANAGE_GUILD')) 
return message.channel.send('No tienes permisos.  `Gestionar Servidor`');
  if(!opciones.has(`${message.guild.id}.prefix`)) return message.channel.send("el prefix no esta establecido")
  await opciones.delete(`${message.guild.id}.prefix`)
  message.channel.send('Prefix Reiniciando. Prefix por defecto `/`');
}