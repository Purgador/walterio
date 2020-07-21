const marsnpm = require("marsnpm");

module.exports = async (client, message, args, ops) => {
let img = await marsnpm.punch()
let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  if(!user) return message.channel.send('**:grey_exclamation:** | Menciona a alguien');
  
  if (user.id === message.author.id) 
    return message.channel.send("**:grey_exclamation:** | No puedes golpearte, va encontra de mis politicas O:");

  let embed = new ops.Discord.MessageEmbed()
  embed.setDescription(user.id === client.user.id ? "*Llora* Me duele :'("  : `**${message.author.username}** golpeo a ${user.username}`) 
  embed.setImage(img);
  
  message.channel.send(embed);
}