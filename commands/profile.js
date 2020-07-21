const {crearDB} = require("megadb"),
 level_db = new crearDB('niveles'),
 opciones = new crearDB('opciones'),
 text = new crearDB('personaltext'),
 economia = new crearDB('economia'),
 marry = new crearDB('marrys');
module.exports = async (client, message, args, ops) => {
  if (args[0] === "set") {
    const embed2 = new ops.Discord.MessageEmbed()
  .setAuthor(message.author.username + " Debes de utilizarlo de la siguiente manera.", message.author.displayAvatarURL)
  .setColor(message.guild.me.displayHexColor)
  .setDescription("`" + ops.prefix + "set <acción> <dato>`\n\n**Acciones disponibles**:\n`" + ops.prefix + "profile set text <Personal Text>`\n`" + ops.prefix + "set lang es o en`")
  if (!args[1])
    return message.channel.send(embed2);
  if(args[1] === "text"){           
  if(!args[2]) return message.channel.send("Escribe el texto a ver en tu perfil");
    await text.set(message.author.id, args.slice(2).join(" "))
    return message.channel.send("Texto personal establecido a: " + args.slice(2).join(" "))
  }else{
    return message.channel.send("Opcion Incorrecta!")
  }
}
    let user = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
  || message.author
if(!economia.has(`${user.id}.dinero`)) economia.set(`${user.id}.dinero`,200)
if(!economia.has(`${user.id}.rep`)) economia.set(`${user.id}.rep`,0)
  let dinero = await economia.get(`${user.id}.dinero`),
      reputation = await economia.get(`${user.id}.rep`),
     {xp, lvl} = await level_db.get(`${message.guild.id}.${user.id}`);
  const embed = new ops.Discord.MessageEmbed()
  .setAuthor(user.username, user.displayAvatarURL({dynamic:true}))
  embed.setDescription(`**Perfil** de ${user.tag}`)
  embed.addField(":speech_balloon: Texto Personal", text.has(user.id) ? await text.get(user.id) : ops.lang.commands.profile.personal_text, true)
  embed.addField(":sparkles: Nivel", lvl, true)
  .addField("<a:up:707794657186414623> XP",`${xp}/${5 * (lvl ** 2) + 20 * lvl + 30}`, true)
  .addField("<a:coin:707796364624527420> Monedas", dinero.toLocaleString(), true)
  .addField(":blue_square: Rep", reputation.toLocaleString(), true)
  embed.addField(":ring: Casad@ con", marry.has(`${user.id}.tag`) ? await marry.get(`${user.id}.tag`) : ops.lang.commands.profile.marry, true)
  embed.setColor(message.guild.member(user).displayHexColor)
  .setTimestamp()
  .setFooter("Sistema en beta")
  
   return message.channel.send(embed)
}