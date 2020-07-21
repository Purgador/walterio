const marsnpm = require("marsnpm");
module.exports = async (client, message, args, ops) => {
let img = await marsnpm.kiss()

let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)

  
if(!user) return message.channel.send('**:grey_exclamation:** | Menciona a alguien');
  
  if (user.id === message.author.id) 
    return message.channel.send("**:grey_exclamation:** | No puedes besarte, es imposible ..");
  
  let embed = new ops.Discord.MessageEmbed()
  embed.setDescription(user.id === client.user.id ? "*Se sonroja* oh Gracias :)" : `**${message.author.username}** beso a ${user.username}`) 
  embed.setImage(img);
  
  message.channel.send(embed);
}