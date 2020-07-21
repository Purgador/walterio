module.exports = (client, message, args, ops) => {
    if (!ops.serverQueue) return message.channel.send('¡No hay canción que mostrar!, la cola esta vacía');
  
  const queue = ops.serverQueue.songs,
        page = Math.round(queue.length / 10),
        embed = new ops.Discord.MessageEmbed();
  if(queue.length < 12){
    let lista = [];
    embed.setTitle(`Lista de canciones de ${message.guild.name}`)
    .setColor("#0099ff")
    .setThumbnail(message.guild.iconURL({dynamic:true}));
    
    for(let i=0; i < queue.length; i++){
      
      lista.push(`${i+1}. 🎵 [${queue[i].title}](${queue[i].url})\n👤 Por: **${queue[i].author.username}**`)
     
    }
     embed.setDescription(lista.join("\n"));
  }else{
    
    let uwu = [];
    
    if(args[0]){
  var numero = parseInt(args[0]);
      numero--;
      numero = numero * 10;
    }else{
      numero = 0;
    }
    embed.setTitle(`Lista de canciones de ${message.guild.name}`)
    .setColor("#0099ff")
    .setFooter(`Pagina: ${args[0] || 1} de ${page}`) 
    .setThumbnail(message.guild.iconURL({dynamic:true}));
    
    for(let i=0; i < 10; i++){
      if(args[0]){
         if(numero > page * 10) numero = page * 10;
      }else{
        numero = 0;
      }
      if(i + numero + 1 > queue.length) break;
      
      uwu.push(`${i+ numero + 1}. [${queue[i + numero].title}](${queue[i + numero].url})\nRequerido Por: **${queue[i + numero].author.username}**`)
     
    }
      embed.setDescription(uwu.join("\n"));
  }
message.channel.send(embed);
  
  
  
/*
emm lueego me explicas :v?
for(let i=0; i < fetched.songs.length ; i++){
    var resp = `__**Reproduciendo:**__[${queue[0].title}](${queue[0].url})\nRequerido Por:** *${queue[0].author.username}*\n\n__**Cola de Canciones:**__\n\n${i+2}. **[${queue[i+1].title}](https://www.youtube.com${queue[i+1].url})\nRequerido Por:** *${queue[i+1].author.username}*\n`;
  }
     .setDescription(resp)


message.channel.send(embed);
  */
  
}