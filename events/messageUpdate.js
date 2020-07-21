const {MessageEmbed} = require("discord.js"),
 {crearDB} = require("megadb"),
 opciones = new crearDB('opciones');

module.exports = async (client, oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) return;
if(!opciones.has(`${newMessage.guild.id}.channels.logs`)) return;
  const logchannel = await opciones.get(`${newMessage.guild.id}.channels.logs`),
        canal = client.channels.cache.get(logchannel),
        logEmbed = new MessageEmbed()
  .setTitle("**「:writing_hand:」** Mensaje Editado (Click para ir al mensaje)")
  .setColor("BLUE").setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
  .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL({dynamic:true}))
  .setURL(`http://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}`)
  if(oldMessage.content && !(oldMessage.content > 1024)) {
    logEmbed.addField("Antes", oldMessage.content ,true)
  }
    logEmbed.addField("En:", oldMessage.channel, true)
if(newMessage.content && !(newMessage.content > 1024)){
    logEmbed.addField("Despues", newMessage.content ,true)
}
    logEmbed.setTimestamp()
    .setFooter(`ID: ${oldMessage.author.id}`);
  canal.send(logEmbed);
}
