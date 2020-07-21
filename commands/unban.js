module.exports = (client, message, args, ops) => {
  
let permiso = message.member.hasPermission("BAN_MEMBERS");
  
if(!permiso) return message.channel.send("Este comando requiere el permiso 'Banear Miembro'.")

let user = args[0]

if(!user) return message.reply(" Ingrese una ID del usuario baneado.")

if(user === message.author.id) return message.reply(" Obviamente tu ID no está baneada.")

if (message.guild.members.cache.get(user)) return message.channel.send("Esta ID no esta baneada aqui.")

message.guild.members.unban(user, 2);
message.channel.send(`Se ha removido la sanción al usuario: **${user.username}**`)

}