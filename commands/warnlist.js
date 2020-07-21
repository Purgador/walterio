const megadb = require("megadb");
let warns = new megadb.crearDB('warns');
module.exports = async (client, message, args, ops) => {
  const embed2 = new ops.Discord.MessageEmbed()
  .setTitle("¡No tienes permisos suficientes! | `Gestionar Mensajes`")
if(!message.member.hasPermission("MANAGE_MESSAGES")) 
  return message.channel.send(embed2);
  if(!warns.has(message.guild.id)) return message.channel.send('No hay ninguno usuario sancionado.')
  
  let usuarios = get(await warns.get(message.guild.id), message);
  usuarios.map((usuario, index) => usuarios[index] = `> #${index+1} ${usuario[0]} | Warns: ${usuario[1]} | Reason: ${usuario[2]}`)
  let paginas = []
  let cantidad = 10
  
  while(usuarios.length > 0) {
    paginas.push(usuarios.splice(0, cantidad))
  }
  const embed = new ops.Discord.MessageEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL({dynamic:true}))
  if(!args[0]){
    embed.setDescription(`Warnlist del servidor ${message.guild.name} (pagina 1 de ${paginas.length})\n\n${paginas[0].join("\n")}`)
    return message.channel.send(embed)
  }
  if(isNaN(args[0])) return message.channel.send("Necesitas ingresar el numero de la pagina")
  
  let seleccion = parseInt(args[0])

  if(seleccion <= 0 || seleccion > paginas.length) return message.channel.send(`La pagina ${seleccion} no existe.`)
  
  embed.setDescription(`Warnlist del servidor ${message.guild.name} (pagina ${seleccion} de ${paginas.length})\n\n${paginas[seleccion-1].join("\n")}`)
    return message.channel.send(embed)
  
  
  
  } 
function get (users, message) {
    let userlist = []
    for(var key in users){
      let usuario = message.guild.members.cache.has(key) ? message.guild.members.cache.get(key).user.username : `Salio (${key})`
      userlist.push([usuario, users[key].warns, users[key].reason])
    }
    
    userlist.sort((user1, user2) => {
      
      return user2[1] - user1[1] || user2[2] - user1[2];
    })
    return userlist;
  }