const marsnpm = require("marsnpm");
module.exports = async (client, message, args, ops) => {
  let img = await marsnpm.kill(),
 user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  if(!user) return message.channel.send(ops.lang.no_user);
  let embed = new ops.Discord.MessageEmbed()
  embed.setDescription(user.id === message.author.id ? `${message.author.username} ${ops.lang.commands.kill.himself}`  : `${message.author.username} ${ops.lang.commands.kill.another_person} ${user.username}`) 
  embed.setImage(img);
  message.channel.send(embed);
}