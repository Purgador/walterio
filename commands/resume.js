module.exports = async (client, message, args, ops) => {
let fetched = ops.queue.get(message.guild.id);
  
   if (!fetched) return message.channel.send('¡No hay canción!, la cola esta vacía.');
  
   if (!message.member.voice.channel) return message.channel.send('debes unirte a un canal de voz.');
  
  if (!fetched.connection.dispatcher.paused) return message.channel.send("La musica no esta pausada");
  
  await fetched.connection.dispatcher.resume();
  
  message.channel.send("Canción actual reanudada.")
  
  
}