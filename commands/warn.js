const megadb = require("megadb"),
 warns = new megadb.crearDB('warns'),
 opciones = new megadb.crearDB('opciones');

module.exports = async (client, message, args, ops) => {
  const embed = new ops.Discord.MessageEmbed()
  .setTitle("¡No tienes permisos suficientes! | `Gestionar Mensajes`")
if(!message.member.hasPermission("MANAGE_MESSAGES")) 
  return message.channel.send(embed); // Permiso
let wUser = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined);
let mUser = message.author;
if(!wUser) return message.channel.send("Menciona a un usuario `/warn @EL RISAS#5473 spam`")
let razon = args.slice(1).join(' ');
  // No reason
  if (!razon)  razon = "Incumplimiento de las reglas";
  
if(!warns.has(`${message.guild.id}.${wUser.id}.warns`)) {
 await warns.set(`${message.guild.id}.${wUser.id}.warns`, 0);
}
await warns.add(`${message.guild.id}.${wUser.id}.warns`, 1);
  
if(!warns.has(`${message.guild.id}.${wUser.id}.reason`)) {
await warns.set(`${message.guild.id}.${wUser.id}.reason`, [`${razon}`]);
}else{
await warns.push(`${message.guild.id}.${wUser.id}.reason`, [`${razon}`]);
}
let count = await warns.get(`${message.guild.id}.${wUser.id}.warns`);
  if(opciones.has(`${message.guild.id}.channels.logs`)) {
  let logchannel = await opciones.get(`${message.guild.id}.channels.logs`);
let canal = client.channels.cache.get(logchannel)
const embed2 = new ops.Discord.MessageEmbed()
.setColor("RED")
.setThumbnail(wUser.displayAvatarURL({dynamic:true}))
.setDescription('**Warn**') // Descripcion
.addField('「:boy:」Usuario:', wUser)
.addField('「:speech_balloon:」Razón:', razon)
.addField('「:closed_book:」Cantidad de advertencias:', count)
.addField('「:fleur_de_lis:️」 Moderador responsable:', mUser)
  canal.send(embed2);
  }
   const embed3 = new ops.Discord.MessageEmbed()
      .setAuthor(wUser.tag + " Ha sido advertido",wUser.displayAvatarURL({dynamic:true}))
      .setDescription("**Razón**: "+ razon);
     message.channel.send(embed3);
  message.delete();
}