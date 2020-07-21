module.exports = (client, message, args, ops) => {
  if(message.deletable) message.delete()
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("No tienes permiso para usar este comando `Gestionar Mensajes`").then(m => m.delete({timeout: 5000}));
  if (!args[0])
    return message.channel.send("Nada para decir? `Ej: /say Hola o /say embed Hola o /say image url.com`").then(m => m.delete({timeout: 5000}));
  let emoji;
  message.content.split(' ').map(x => {
  if(x.startsWith(':') && x.endsWith(':')) emoji = client.emojis.cache.find(r => r.name === x.slice(1, -1))
  else x
})
  const roleColor = message.guild.me.displayHexColor;
  
  if(args[0].toLowerCase() === "image") {
    if (!args[1])
      return message.channel.send("Nada para ver? `Ej: /say image url.com`").then(m => m.delete({timeout: 5000}));
    if(/https?:\/\/.+\.(?:png|jpg|jpeg|gif)/g.test(args[1]) === false) return message.channel.send("esta no es una url, o no tiene el formato permitido `png, jpg, jpeg` ejemplo: `/say image https://i.caffe-bot.com/img-example.png`")
    const embed = new ops.Discord.MessageEmbed()
    .setImage(args.slice(1).join(" "))
    .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);
    message.channel.send(embed);
  }else if (args[0].toLowerCase() === "embed") {
    if (!args[1])
      return message.channel.send("Nada para decir? `Ej: /say embed Hola`").then(m => m.delete({timeout: 5000}));
    const embed = new ops.Discord.MessageEmbed()
  if (!emoji) {
    embed.setDescription(args.slice(1).join(" "))
}else{
  let descReplace = new RegExp(`:${emoji.name}:`);
  let replace = args.slice(1).join(" ").replace(descReplace, `<a:${emoji.name}:${emoji.id}>`);
  embed.setDescription(replace)
}
    embed.setColor(roleColor === "#000000" ? "#ffffff" : roleColor);
    message.channel.send(embed);
  } else {
  if (!emoji) message.channel.send(args.join(" "));
  else {
  let descReplace = new RegExp(`:${emoji.name}:`);
  let replace = args.join(" ").replace(descReplace, `<a:${emoji.name}:${emoji.id}>`);
  message.channel.send(replace);
    }
  }
}