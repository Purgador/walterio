module.exports = async (client, message, args, ops) => {
  
  let fetched = ops.queue.get(message.guild.id);
  
  if (!message.member.voice.channel) 
    return message.channel.send('debes unirte a un canal de voz.');
   if (!fetched) 
     return message.channel.send("No hay ninguna cancion en la cola");
  
  let userCount = message.member.voice.channel.members.size

  let required = Math.ceil(userCount/2);
  
  if (!fetched.songs[0].vote) fetched.songs[0].vote = [];
  
  if (fetched.songs[0].vote.includes(message.member.id)) 
    return message.channel.send(`Ya has votado para saltar la cancion! ${fetched.songs[0].vote.length}/${required} requeridos.`);
  
   fetched.songs[0].vote.push(message.member.id);
  if(fetched.songs[0].author.id === message.author.id) {
    message.channel.send(":white_check_mark: Cancion Saltada!");
  return skip(fetched)
}
  if(message.member.hasPermission("MANAGE_MESSAGES")){
        message.channel.send(":white_check_mark:Un DJ a Saltado la Cancion!");
  return skip(fetched)
  }
  if (fetched.songs[0].vote.length >= required) {
message.channel.send(`:white_check_mark: Votos ${fetched.songs[0].vote.length}/${required} requeridos, cancion Saltada!`)
  return skip(fetched)
 }
  message.channel.send(`Voto para saltar la cancion ${fetched.songs[0].vote.length}/${required} requeridos.`)
}
async function skip(fetched) {
  await fetched.connection.dispatcher.end();
}