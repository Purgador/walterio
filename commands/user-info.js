module.exports = (client, message, args, ops) => {
  let usuario = message.mentions.members.first() 
  || message.member;
  let color = {
    online: "#00c903",
    idle: "#ff9a00",
    dnd: "#ff0000",
    offline: "#d8d8d8"
  },
   estados = {
    online: "En Línea",
    idle: "Ausente",
    dnd: "No molestar",
    offline: "Desconectado/invisible"
  }
  const embed = new ops.Discord.MessageEmbed()
    .setColor(color[usuario.presence.status])
    .setDescription(`Informacion del usuario ${usuario.user.username}`)
    .setThumbnail(usuario.user.displayAvatarURL({dynamic:true}))
    .setTimestamp()
    .setAuthor(usuario.user.tag, usuario.user.displayAvatarURL({dynamic:true}))
    .addField("「:bust_in_silhouette: 」Nombre", usuario.user.tag,true)
    .addField("「:inbox_tray:」Estado", estados[usuario.presence.status], true);
  if (usuario.presence.activities.name) {
    embed.addField("「:video_game:」Actividad", usuario.presence.activities.name,true);
  }
  embed.addField("「:id:」ID", usuario.id, true)
    .addField("「:new:」Cuenta Creada", usuario.user.createdAt.toDateString(),true)
    .addField("「:calendar:」Ingresó", usuario.joinedAt.toDateString(),true)
if(usuario.nickname !== null){
    embed.addField("「:page_facing_up:」Apodo", usuario.nickname, true)
}
    embed.addField("「:game_die:」Roles", usuario.roles.cache.map(m => m).join(" **|** "),true);
  return message.channel.send(embed);
};
