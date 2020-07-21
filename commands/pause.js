module.exports = async (client, message, args, ops) => {
  
  if (!ops.serverQueue) return message.channel.send('¡No hay canción!, la cola esta vacía.');
  
   if (!message.member.voice.channel) return message.channel.send('debes unirte a un canal de voz.');
  
   if (ops.serverQueue.connection.dispatcher.paused) 
     return message.channel.send("La musica ya esta pausada");
  
   await ops.serverQueue.connection.dispatcher.pause(true);
  
   message.channel.send("Canción actual en pausa.")
}
