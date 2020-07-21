module.exports = (client, message, args, ops) => {
const lang = ops.lang.commands.help,
   embed = new ops.Discord.MessageEmbed() 
    .setTitle(`**「<a:bien:703373249148354602>」 ${lang.title}**`)
    .setColor(0x00ffff)
    .setFooter("•Walterio• V"+ require('../package.json').version, client.user.displayAvatarURL({dynamic:true}))
    .setTimestamp()
    .setThumbnail("https://i.imgur.com/K4LE1rs.gif")
    .addField(lang.field, "`8ball, angry, cry, drake, hug, kill, kiss, love, meme, punch, trump.`", true)
    .addField(lang.field2, "`ban, clear, kick, mute, unban, unmute, warn, warnlist.`", true)
    .addField(lang.field3, "`move, pause, play, queue, resume, skip, volume.`", true)
    .addField(lang.field4, "`avatar, balance, daily, divorce, dm, marry, profile, rank, ranklist, resetprefix, say, set, transfer, translate.`", true)
    .addField(lang.field5, "`botinfo, help, server-boost, server-info, server-mc, user-info.`", true)
    message.channel.send(embed);
  message.channel.send(`**${message.author.username}**, ${lang.sucess}.`);
}



