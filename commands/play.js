const search = require("youtube-search"),
      ytdl = require("ytdl-core");

module.exports = async (client, message, args, ops) => {
  const voiceChannel = message.member.voice.channel;
  const guild = message.guild;
  if (!voiceChannel) return message.channel.send('**:grey_exclamation:** | Necesitas unirte a un canal de voz para reproducir música!');
  const permissions = voiceChannel.permissionsFor(message.member.user);
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
      return message.channel.send('¡Necesito permisos para unirme y hablar en el canal de voz!');
  if (!args[0])
    return message.channel.send("**:grey_exclamation:** | Ingrese un enlace de youtube o titulo para Reproducirlo.");
  
  var opts = {
    maxResults: 1,
    key: 'AIzaSyC5qvZzL3HuewGlHhRJnWOdH8mhLsctNCs',
    type: "video"
  };
  const songArg = await search(args.join(' '), opts);
  let songURL = songArg.results[0].link;
  const songInfo = await ytdl.getInfo(songURL);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
    author: message.author
  };
 if (!ops.serverQueue) {
const queueObject = {
 textChannel: message.channel, //guardamos el canal de texto
 voiceChannel: voiceChannel, // guardamos el canal de voz
 connection: null, // un objeto para la conexión 
 songs: [], // creamos la lista de canciones
 volume: 5, // volumen al iniciar la cola
 playing: true, // un objeto para validar la cola de música en reproducción.
};
   
ops.queue.set(message.guild.id, queueObject);

queueObject.songs.push(song);
   
try {
var connection = await voiceChannel.join();
 queueObject.connection = connection;

 message.channel.send(`Reproduciendo ahora: **${song.title}**`);

 play(guild, queueObject.songs[0], ops);

} catch (err) {

 console.log(err);
 ops.queue.delete(message.guild.id);
 return message.channel.send(err);

}
}else {
  ops.serverQueue.songs.push(song);
  return message.channel.send(`**${song.title}** ha sido añadido a la cola!, __por: ${message.author.tag}__`);

}
}
function play(guild, song, ops) {
   const serverQueue = ops.queue.get(guild.id);

 if (!song) {
  serverQueue.voiceChannel.leave();
  ops.queue.delete(guild.id);
  return;
 }
  const dispatcher = serverQueue.connection.play(ytdl(song.url)).on('finish', () => {
   
   serverQueue.songs.shift();

   play(guild, serverQueue.songs[0], ops);
    if(serverQueue.songs[1]) serverQueue.textChannel.send(`Reproduciendo ahora: **${song.title}**`);
}).on('error', error => console.error(error));
 dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

}