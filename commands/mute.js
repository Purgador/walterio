const {crearDB} = require("megadb"),
 opciones = new crearDB('opciones'),
 cooldown = new crearDB("cooldownmute"),
 ms = require("ms");
module.exports = async (client, message, args, ops) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(ops.lang.permissions.member.MANAGE_MESSAGES);
  if (!message.guild.me.hasPermission(["MANAGE_ROLES", "MANAGE_CHANNELS"])) return message.channel.send(ops.lang.permissions.me.MANAGE_ROLES_and_MANAGE_CHANNELS)

  let tomute = message.mentions.users.first() 
  || client.users.cache.get(args[0])
  if( !tomute) return message.channel.send( `Necesitas mencionar al usuario que quieres mutear, tambien necesitas colocar el tiempo:
\`\`\`prolog
S => Para milisegundos.
s => Para segundos.
m => Para minutos.
H o h => Para horas.
D o d => Para dias.
W o w => Para semanas.
M => Para meses.
\`\`\`
`);
  if(tomute.id == client.user.id || tomute.id == message.author.id) return message.channel.send("No te puedes mutear/No me puedes mutear.")
  if((message.author.id != 614957978675838976) && message.guild.member(tomute).hasPermission("MANAGE_GUILD")) return message.reply("No puedo mutear al usuario");
  if(!args[1]) return message.channel.send(`Necesitas colocar el tiempo:
\`\`\`prolog
S => Para milisegundos.
s => Para segundos.
m => Para minutos.
H o h => Para horas.
D o d => Para dias.
W o w => Para semanas.
M => Para meses.
\`\`\`
`);
  let mutetime = ms(args[1]);
  if(!mutetime) return message.channel.send("Formato invalido, asegurate de poner el tiempo correctamente.")
  let reason = args.slice(2).join(" ");
  if (!reason)  reason = "Incumplimiento de las reglas!";
  let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
  if(!muterole){
    try{
      muterole = await message.guild.roles.create({data: {name: 'Muted', color: '#7E7E7E"',}})
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, { SEND_MESSAGES: false, SEND_TTS_MESSAGES: false, ADD_REACTIONS: false});
      });
    }catch(e){console.log(e.stack);}
  }
if(message.guild.member(tomute).roles.cache.has(muterole.id)) return message.channel.send(`El usuario ${tomute.username} actualmente ya se encuentra muteado.`)
if(cooldown.has(`${message.guild.id}.${tomute.id}.mute`)) return message.channel.send(`El mute del usuario ${tomute.username} aun no expira`)
    message.channel.send(`${tomute.tag} Ha sido muteado Por: ${args[1]} Razón: ${reason}`);
  let muteembed = new ops.Discord.MessageEmbed()
  .setDescription(`Mute ejecutado por ${message.author}`)
  .setColor("ORANGE")
  .addField("Usuario Muteado", tomute)
  .addField("Muteado en", message.channel,true)
  .addField("Fecha", message.createdAt.toDateString(),true)
  .addField("Por", args[1],true)
  .addField("Razon", reason,true);
  if(opciones.has(`${message.guild.id}.channels.logs`)) {
  let logchannel = await opciones.get(`${message.guild.id}.channels.logs`);
  
  let incidentschannel = message.guild.channels.cache.get(logchannel)
  if(!incidentschannel) return;
  incidentschannel.send(muteembed);
  }
      await cooldown.set(`${message.guild.id}.${tomute.id}.mute`, Date.now() + mutetime);
      await cooldown.set(`${message.guild.id}.${tomute.id}.channel`, message.channel.id)
}