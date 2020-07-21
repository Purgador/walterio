module.exports = (client, message, args, ops) => {
let user = message.mentions.users.first()
  || client.users.cache.get(args[0]),
    reason = args.slice(1).join(" "),
    lang = ops.lang.commands.ban;
  
  if(!message.member.hasPermission('BAN_MEMBERS'))
    return message.channel.send(ops.lang.permissions.member.BAN_MEMBERS);
  
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) 
    return message.channel.send(ops.lang.permissions.me.BAN_MEMBERS);
  
  if (!args[0])
    return message.channel.send(lang.no_args);
  
  if (!user)
    return message.channel.send(lang.no_user);
  
  if (!reason) reason = lang.no_reason;
  
  if (user.id === message.author.id) 
    return message.channel.send(lang.yourself);

  if (!message.guild.member(user).bannable)
    return message.channel.send(lang.bannable);
  
  message.guild.members.ban(user, { reason: reason });

  message.channel.send(`${user.tag}, ${lang.sucess} ${reason}.`);
};
