module.exports = (client, message, args, ops) => {
 if(message.deletable) message.delete();
  
  let user = message.mentions.users.first()
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  
  let md = new ops.Discord.MessageEmbed()
    .setDescription(ops.lang.commands.dm.description)
    .addField(ops.lang.commands.dm.field.title, ops.prefix + ops.lang.commands.dm.field.description,true)
    .addField(ops.lang.commands.dm.field2.title, ops.prefix + ops.lang.commands.dm.field2.description,true)
    .setFooter("•walterio-web.glitch.me•", client.user.displayAvatarURL({dynamic:true}))
    .setTimestamp()
    .setColor(0x00ffff);
  let mensaje = args.slice(1).join(" ");
  
  if (!mensaje) return message.channel.send(md);
  
  const embed = new ops.Discord.MessageEmbed()
    .setTitle(":mailbox_with_mail:**__MENSAJE MD__**:mailbox_with_mail:")
    .addField(ops.lang.commands.dm.field3.title, `${mensaje}`)
    .setFooter(`${ops.lang.commands.dm.field3.footer} ${message.author.tag}`, user.displayAvatarURL({dynamic:true}))
    .setColor(0x00ffff);
  message.channel.send(ops.lang.commands.dm.sucess).then(m => {
    m.delete({ timeout: 5000 }).catch(e => console.log(e.message));
  }).catch(e => console.log(e.message));
  user.send(embed).catch(e => message.channel.send(e.message));
};
