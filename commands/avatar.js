module.exports = (client, message, args, ops) => {

let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  || message.author,
    lang = ops.lang.commands.avatar,
    embed = new ops.Discord.MessageEmbed()
  .setImage(user.displayAvatarURL({ dynamic: true, size: 2048}))
  .setColor(message.guild.member(user).displayHexColor)
  .setFooter(message.author == user ? `${lang.no_user} ${user.username}` : `${lang.user} ${user.username}`);
    message.channel.send(embed);
}