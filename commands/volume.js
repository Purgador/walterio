module.exports = async (client, message, args, ops) => {

  let serverQueue = ops.queue.get(message.guild.id);
  
   if (!serverQueue) return message.channel.send('¡No hay canción!, la cola esta vacía.');
   if(!args.join(' ')) return message.channel.send('Agrege el volumen entre **1 a 100%**')

   // Creamos una variable para el porcentaje del volumen
   let countVolumen = parseInt(args[0]);
   
   if (countVolumen <= 100) {
    let dispatcher = serverQueue.connection.dispatcher;

    // Modificamos el volumen de la canción en reproducción
    await dispatcher.setVolume(Math.min((dispatcher.volume = countVolumen / 50)))

    message.channel.send(`**Volume:** \`${Math.round(dispatcher.volume*50)}\`**%**`)

   } else {
    message.channel.send('El volumen debe estar entre **1 a 100%**')

   }
}