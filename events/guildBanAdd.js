const { MessageEmbed } = require("discord.js"),
 { crearDB } = require('megadb'),
 opciones = new crearDB("opciones");

module.exports = async (client, user, guild ) => {
  if(!opciones.has(`${guild.id}.channels.logs`)) return;
  let logchannel = await opciones.get(`${guild.id}.channels.logs`),
      robot = { true: "Si", false: "No"};
  if (!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
  guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(logs => {
    let userID = logs.entries.first().executor.id;
    let userAvatar = logs.entries.first().executor.displayAvatarURL({dynamic:true});
    if (userID === client.user.id) return;
    let msgChannel = new MessageEmbed()
      .setTitle("**「:x:」 • Miembro Baneado**")
      .setColor('RED')
      .addField("**「:boy: 」• Nombre**", user.tag, true)
      .addField("**「:calendar:」• Unido el**", user.joinedAt.toDateString(), true)
      .addField("**「:robot:」• Bot?**", robot[user.bot], true)
      .addField("Por", `<@${user.id}>`,true)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL({dynamic:true}))
   let logginChannel = client.channels.cache.get(logchannel)
  if(!logginChannel) return;
  logginChannel.send(msgChannel);
  })
};
