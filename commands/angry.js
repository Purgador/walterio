const marsnpm = require("marsnpm");
module.exports = async (client, message, args, ops) => {
  let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  || message.author,
   lang = ops.lang.commands.angry,
   url = await marsnpm.angry(),
   embed = new ops.Discord.MessageEmbed()
  embed.setDescription(message.author.id === user.id ? `${user.username} ${lang.no_user}` : `${message.author.username} ${lang.user} ${user.username} 😡`)
  embed.setImage(url)
  
  message.channel.send(embed)
}