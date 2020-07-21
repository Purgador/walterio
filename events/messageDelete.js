const {MessageEmbed} = require("discord.js"),
 {crearDB} = require("megadb"),
 opciones = new crearDB('opciones');

module.exports = async (client, message) => {
if(!opciones.has(`${message.guild.id}.channels.logs`)) return;
  let logchannel = await opciones.get(`${message.guild.id}.channels.logs`);
  let logginChannel = client.channels.cache.get(logchannel)
  if(!logginChannel) return;
const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
let user;
if (entry.extra.channel.id === message.channel.id
&& (entry.target.id === message.author.id)
&& (entry.createdTimestamp > (Date.now() - 10000))
&& entry.extra.count >= 1) {
  user = entry.executor
} else { 
  user = message.author
}
  if(message.content) {
    let logEmbed = new MessageEmbed()
    .setTitle("**「:wastebasket:」** Mensaje Borrado")
    .setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
    .setFooter(`ID: ${message.author.id}`, message.author.displayAvatarURL({dynamic:true}))
    .setTimestamp()
    .setColor("RED")
    .addField("En", message.channel, true)
    .addField("Por", `<@${user.id}>`,true)
    .addField("Mensaje", message.content, true);
logginChannel.send(logEmbed);
}
if(message.attachments.size > 0){
  let Attachs = (message.attachments).array()
  Attachs.forEach(m => {
    const embed = new MessageEmbed()
    .setTitle("**「:wastebasket:」** Imagen Borrada")
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
    .setFooter(`ID: ${message.author.id}`, message.author.displayAvatarURL({dynamic:true}))
    .setColor("RED")
    .addField("En", message.channel, true)
    .addField("Por", `<@${user.id}>`,true)
    .setImage(m.proxyURL)
    logginChannel.send(embed)
  }) 
}
} 