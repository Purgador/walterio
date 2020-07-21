module.exports = async (client, message, args, ops) => {
if(!([ops.ownerID].includes(message.author.id) || [ops.idWitherBlood].includes(message.author.id))) 
  return message.channel.send(ops.lang.commands.eval.error);
      const reload = new ops.Discord.MessageEmbed()
        .setTitle(':arrows_counterclockwise: | **Recargando el sistema**')
        .setDescription('`Espera 5 Segundos`')
        .setThumbnail(`https://cdn.discordapp.com/attachments/571049817921290250/572433829801754655/a8keeuutawx01.gif`)
        .setColor(0x00ffff)
        .setFooter('Requerido por '+ message.author.username +'')             
      message.channel.send(reload).then(() => {
                client.destroy()
                process.exit();
         });

}