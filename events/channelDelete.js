const { crearDB } = require("megadb"),
 opciones = new crearDB('opciones'),
 { MessageEmbed } = require("discord.js");

module.exports = async (client, channel) => {
  if (channel.type === "dm") return;
  if(!opciones.has(`${channel.guild.id}.channels.logs`)) return;
  const logchannel = await opciones.get(`${channel.guild.id}.channels.logs`),
        logEmbed = new MessageEmbed()
    .setTitle("**「:x:」• Canal Removido**")
    .setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    .setColor("RED")
    .addField("Tipo", "`" + channel.type + "`", true)
    .addField("Nombre", "`" + channel.name + "`", true)
    .addField("Creado", "`" + channel.createdAt.toDateString() + "`", true)
    .addField("ID", "`" + channel.id + "`", true)
    .setTimestamp()
    .setFooter(`•${channel.guild.name}•`, client.user.displayAvatarURL({dynamic:true}), true); 
  let canal = client.channels.cache.get(logchannel);
  if(!canal) return;
  canal.send(logEmbed);
};
