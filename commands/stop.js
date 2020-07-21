module.exports = async (client, message, args, ops) => {
   if (!message.member.voice.channel) return message.channel.send('Debes unirte a un canal de voz para detener la canción.');
   if (!ops.serverQueue) return message.channel.send('¡No hay canción!, la cola esta vacía.');
   // Aquí borramos la cola de las canciones agregadas
   ops.serverQueue.songs = [];

   // Finalizamos el dispatcher
   await ops.serverQueue.connection.dispatcher.end();
   message.channel.send('Lista de canciones fue detenida.')

  }