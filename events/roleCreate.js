const {MessageEmbed} = require('discord.js'),
 {crearDB} = require('megadb'),
 opciones = new crearDB("opciones");

module.exports = async (client, role) => {  
  if(!opciones.has(`${role.guild.id}.channels.logs`)) return;
  let logchannel = await opciones.get(`${role.guild.id}.channels.logs`);
let rolembed = new MessageEmbed()
 .setTitle("**「:white_check_mark: 」Rol Creado**")
 .setColor("GREEN")
 .addField("Nombre:", role.name, true)
 .addField("ID:", role.id, true)
 .setTimestamp()
 .setFooter(`•${role.guild.name}•`, client.user.displayAvatarURL({dynamic:true}), true);
  let logginChannel = client.channels.cache.get(logchannel); 
  if(!logginChannel) return;
  logginChannel.send(rolembed);
};
