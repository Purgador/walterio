const {MessageEmbed} = require("discord.js"),
{crearDB} = require("megadb"),
 opciones = new crearDB("opciones");

module.exports = async (client, oldMember, newMember) => {
  if(!oldMember.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
if(!opciones.has(`${oldMember.guild.id}.channels.logs`)) return;
  const logchannel = await opciones.get(`${oldMember.guild.id}.channels.logs`),
        entry = await oldMember.guild.fetchAuditLogs({type: 'MEMBER_UPDATE'}).then(audit => audit.entries.first()),
        user = entry.executor;
   if(oldMember.nickname !== newMember.nickname) {
    let msgChannel = new MessageEmbed()
    .setTitle("**「:writing_hand:」 • Nickname Actualizado**")
    .setColor('BLUE')
    .setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    .setFooter(`ID: ${oldMember.user.id}`, oldMember.user.displayAvatarURL({dynamic:true}))
    .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
  if(oldMember.nickname !== null) {
    msgChannel.addField("Nickname anterior", oldMember.nickname ,true)
  }
if(newMember.nickname === null) { 
    msgChannel.addField("Nickname Actual", newMember.user.username, true)
}else {
    msgChannel.addField("Nickname Actual", newMember.nickname, true)
}
    msgChannel.addField("Por", `<@${user.id}>`,true)
    .setTimestamp()
    let channel = client.channels.cache.get(logchannel); 
     if(!channel) return;
       channel.send(msgChannel);
   }
}