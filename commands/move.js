module.exports = async (client, message, args, ops) => {
  
  let lang = ops.lang.commands.move
  
  if(!message.guild.member(client.user).voice.channel) return message.channel.send(lang.disconnected);
  
  if(!message.member.voice.channel) return message.channel.send(lang.need_join);

  if (!ops.serverQueue) return message.channel.send(lang.no_queue);
  
  if (message.member.voice.channel.connection) return message.channel.send(lang.already_connected)
 
  await message.member.voice.channel.join();
  
  message.channel.send(`${lang.sucess} **${message.member.voice.channel.name}**`)
}
