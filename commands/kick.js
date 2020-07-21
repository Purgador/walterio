module.exports = (client, message, args, ops) => {
let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  let reason = args.slice(1).join(" ");
  
  if(!message.guild.me.hasPermission("KICK_MEMBERS")) 
    return message.channel.send(ops.lang.permissions.me.KICK_MEMBERS);
  
  if(!message.member.hasPermission('KICK_MEMBERS'))
    return message.channel.send(ops.lang.permissions.member.KICK_MEMBERS);
  
  if (!args[0])
    return message.reply(ops.lang.commands.kick.no_args);

  if (!user) 
    return message.reply(ops.lang.commands.kick.no_user);
  
  if (!reason) 
    return reason = ops.lang.commands.kick.reason
  
  if (user.id === message.author.id) 
    return message.reply(ops.lang.commands.kick.yourself);
  
  if (!message.guild.member(user).kickable)
    return message.channel.send(ops.lang.commands.kick.kickable);
  
  message.guild.member(user).kick(reason);
  
  message.channel.send(`**${user.tag}**, ${ops.lang.commands.kick.sucess}, ${ops.lang.commands.kick.reason}: ${reason}.`);
}