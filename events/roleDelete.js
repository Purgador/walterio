const {MessageEmbed} = require('discord.js'),
 {crearDB} = require('megadb'),
 opciones = new crearDB('opciones');

module.exports = async (client, role) => {
  if(!opciones.has(`${role.guild.id}.channels.logs`)) return;
  let traduccion = {
false: "No",
true: "Si"
}
  let logchannel = await opciones.get(`${role.guild.id}.channels.logs`);
const rolembed = new MessageEmbed()
 .setTitle("**「:x: 」Rol Borrado**")
 .setColor("RED")
 .addField("Nombre:", role.name, true)
 .addField("ID:", role.id, true)
 .addField("Color:", role.hexColor, true)
 .addField("Mencionable:", traduccion[role.mentionable], true)
 .addField("Permisos:", role.permissions.bitfield, true)
 .addField("Creado:", role.createdAt.toDateString(), true)
 .setTimestamp()
 .setFooter(`•${role.guild.name}•`, client.user.displayAvatarURL({dynamic:true}), true);
  let logginChannel = client.channels.cache.get(logchannel); 
  if(!logginChannel) return;
  logginChannel.send(rolembed);
};
