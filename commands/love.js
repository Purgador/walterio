const {crearDB} = require("megadb"),
marrys = new crearDB("marrys")
module.exports = (client, message, args, ops) => {
  let random = Math.floor(Math.random() * 100),
      love;
if(random >= 0 < 10) love = `**${random}%** :broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart: **${random}%**`
else if(random >= 10 || random < 20) love = `**${random}%** :heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: **${random}%**`
else if(random >= 20 || random < 30) love = `**${random}%** :heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: **${random}%**`
else if(random >= 30 || random < 40) love = `**${random}%** :heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: **${random}%**`
else if(random >= 40 || random < 50) love = `**${random}%** :heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart::black_heart: **${random}%**`
else if(random >= 50 || random < 60) love = `**${random}%** :heart::heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart::black_heart: **${random}%**`
else if(random >= 60 || random < 70) love = `**${random}%** :heart::heart::heart::heart::heart::heart::black_heart::black_heart::black_heart::black_heart: **${random}%**`
else if(random >= 70 || random < 80) love = `**${random}%** :heart::heart::heart::heart::heart::heart::heart::black_heart::black_heart::black_heart: **${random}%**`
else if(random >= 80 || random < 90) love = `**${random}%** :heart::heart::heart::heart::heart::heart::heart::heart::black_heart::black_heart: **${random}%**`
else if(random >= 90 || random < 100) love = `**${random}%** :heart::heart::heart::heart::heart::heart::heart::heart::heart::black_heart: **${random}%**`
else if(random === 100) love = `**${random}%** :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart: **${random}%**`
else love = `**${random}%** :heart::heart::heart::heart::heart::heart::heart::heart::heart::heart: **${random}%**`
if(marrys.has(message.author.id)) love =  `**200%** :sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart::sparkling_heart: **200%**`
  
  let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  
  if (!user) return message.channel.send(ops.lang.no_user)
  if(user.bot) return message.channel.send(ops.lang.commands.love.bot)
  
  const embed = new ops.Discord.MessageEmbed()
  .setThumbnail("https://i.imgur.com/rRI5O0N.png")
  .setDescription(`__**:heartbeat::bow_and_arrow: ${ops.lang.commands.love.relations} :bow_and_arrow::heartbeat:**__\n\n:small_red_triangle_down:${message.author.username}\n:small_red_triangle:${user.username}\n\n${love}`)   
  .setColor(0xff0000)
  message.channel.send(embed);
}