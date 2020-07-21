const { crearDB } = require("megadb"),
      opciones = new crearDB('opciones')

module.exports = async (client, message, args, ops) => {
  const embed = new ops.Discord.MessageEmbed()
  .setAuthor(message.author.username + " Debes de utilizarlo de la siguiente manera.", message.author.displayAvatarURL)
  .setColor(message.guild.me.displayHexColor)
  .setDescription("`" + ops.prefix + "set <acción> <dato>`" + `\n\n` + "**Acciones disponibles**:" + `\n` + "~~set prefix~~ [Dashboard](https://dashboard.caffe-bot.com/" + message.guild.id + ")\n~~set logs~~ [Dashboard](https://dashboard.caffe-bot.com/" + message.guild.id + ")\n`set welcome channel o banner`\n`set goodbye channel o banner`\n~~set autorole @Rol o remove~~ [Dashboard](https://dashboard.caffe-bot.com/" + message.guild.id +")\n`set lang es o en`")
  if (!args[0])
    return message.channel.send(embed);
  if (args[0].toLowerCase() === "welcome") {
    if(!args[1]) return message.channel.send("Porfavor introduce argumentos, `/set welcome channel o banner`")
    if(args[1].toLowerCase() === "channel"){            
      if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send("No tengo permisos,  `Gestionar Canales`");
      if (!message.member.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send("No tienes permisos,  `Gestionar Canales`");
      let channel = message.mentions.channels.first();
      if (!channel)
        return message.channel.send("Porfavor introduce argumentos,  `/set welcome channel #Canal`");
      
      const verified = message.guild.channels.cache.find(r => r.id === channel.id);
      
      if (!verified) return message.channel.send("canal no encontrado");
      
      message.channel.send("autoWelcome cambiado a: <#" + channel.id + ">");
      
      await opciones.set(`${message.guild.id}.channel.welcome`, channel.id);
}else if (args[1].toLowerCase() === "banner") {
  if (!message.guild.me.hasPermission("MANAGE_GUILD"))
    return message.channel.send("No tengo permisos,  `Gestionar Servidor`");
  if(!message.member.hasPermission('MANAGE_GUILD')) 
    return message.channel.send('No tienes permisos,  `Gestionar Servidor`');
  if (!args[2]) return message.channel.send("Porfavor introduce argumentos,  `/set welcome banner image.com` y con su respectiva medida (1920x1080)")
  
  await opciones.establecer(`${message.guild.id}.fondo.welcome`, args[2]);
  message.channel.send("Ahora el Banner de la Bienvenida es " + args[2]);
} else{
message.channel.send("Opción incorrecta, `$set welcome channel o banner`")
}
}else if (args[0].toLowerCase() === "goodbye") {
  if(!args[1]) return message.channel.send("Porfavor introduce argumentos, `/set goodbye channel o banner`");
  if(args[1].toLowerCase() === "channel"){
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("No tengo permisos,  `Gestionar Canales`");
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("No tienes permisos,  `Gestionar Canales`");
    let channel = message.mentions.channels.first();
    if (!channel)
    return message.channel.send("Porfavor introduce argumentos,  `/set goodbye channel #Canal`");
    
    const verified = message.guild.channels.cache.find(r => r.id === channel.id);
    
    if (!verified) return message.channel.send("canal no encontrado");
    
    message.channel.send("autoGoodbye cambiado a: <#" + channel.id + ">");
    
    await opciones.set(`${message.guild.id}.channel.goodbye`, channel.id);
}else if (args[1].toLowerCase() === "banner") {
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('No tienes permisos.  `Gestionar Servidor`');
  if (!args[2]) return message.channel.send("Porfavor introduce argumentos,  `/set goodbye banner image.com` y con su respectiva medida (1920x1080)")
  await opciones.establecer(`${message.guild.id}.fondo.goodbye`, args[2]);
  message.channel.send("Ahora el Banner de la Despedidad es " + args[2]);
} else{
message.channel.send("Opción incorrecta, `$set goodbye channel o banner`")
}
}else if (args[0].toLowerCase() === "autorole") {
   if(!message.guild.me.hasPermission('MANAGE_ROLES')) 
    return message.channel.send('No tengo permisos,  `Gestionar Roles`');
  
  if(!message.member.hasPermission('MANAGE_ROLES')) 
    return message.channel.send('No tienes permisos,  `Gestionar Roles`');
  if(args[1].toLowerCase() === "remove") {
    if(!opciones.has(`${message.guild.id}.role`)) return message.channel.send("autoRole no esta establecido")
    await opciones.delete(`${message.guild.id}.role`)
  return message.channel.send('Autorole Removido.');
  }
  let role = message.mentions.roles.first()
  
  if (!args[1]) return message.channel.send("Porfavor introduce argumentos,  `/set autorole @Role`")
      
  if (!role) return message.channel.send("Rol no encontrado. Habilita la mencion del rol (Si crees que esto es un error envialo al soporte de Discord)")
  
  if(role.comparePositionTo(message.guild.me.roles.highest) > 0){
    return message.channel.send("Ese rol es mas alto que yo rol mas alto (en lo que a jerarquia se refiere), asi no puedo agregarlo a nadie")
}
  
 await opciones.set(`${message.guild.id}.role`, role.id)
if(message.deletable) message.delete({timeout: 1000})
message.channel.send("AutoRole cambiado a: " + role.name)
}else if (args[0].toLowerCase() === "lang") {
let idioma = args[1];
if(!idioma) return message.channel.send(ops.lang.language.enterokay) // lang es un parametro definido antes en el evento message.
if(!["es", "en"].includes(idioma.toLowerCase())) return message.channel.send(ops.lang.language.has)

await opciones.set(`${message.guild.id}.lenguage`, idioma)
    
  let langcode = opciones.has(`${message.guild.id}.lenguage`) ? await opciones.get(`${message.guild.id}.lenguage`) : "en";
      let lang = require(`../langs/${langcode}.js`);
await message.channel.send(lang.language.sucess)
}else{
 message.channel.send("Opción incorrecta!")
}
}