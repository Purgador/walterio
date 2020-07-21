const moment = require("moment");
require('moment-duration-format');

    
module.exports = async (client, message, args, ops) => {

const actividad = moment.duration(client.uptime).format(" D [d], H [hrs], m [m], s [s]"),
      servers = client.guilds.cache.size,
      lang = ops.lang.commands.botinfo,
      users = client.users.cache.size,
      canales = client.channels.cache.size,
      voz = client.voice.connections.size,
      emojis = client.emojis.cache.size,
      version = require('../package.json').version,
      discordjs = require('discord.js').version,
      cpu = `${Math.round(process.cpuUsage().user / 1024 / 1024)}%`,
      memory = `${Math.round((process.memoryUsage().heapUsed / 1024 / 1024).toString().slice(0,6))} MB`,
      invite = await client.generateInvite(["ADMINISTRATOR"]),
      main = new ops.Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic:true}))
        .addField('⁉️ ' + lang.statistics, `>>> **EL RISAS, OswaldoYT** ${lang.owner}\n**${servers.toLocaleString()}** ${lang.guilds}\n**${users.toLocaleString()}** ${lang.users}\n**${canales.toLocaleString()}** ${lang.channels}\n**${emojis.toLocaleString()}** Emojis\n**${client.comandos.size.toLocaleString()}** ${lang.commands}\n**${client.eventos.size.toLocaleString()}** ${lang.events}\n**${actividad}** ${lang.uptime}\n**${Math.round(message.client.ws.ping)}ms** Ping\n**${voz}** ${lang.connections.toLocaleString()}\n**${version}** ${lang.version}\n**${discordjs}** Discord.JS\n**${ops.prefix}** Prefix\n**${memory}** ${lang.usage}\n**${cpu}** CPU`, true)
        .addField('🔧 LINKS', `>>> [Invite](${invite})\n[Discord](https://invite.gg/bahiano)`, true)
        .setColor(0x00ffff)
        .setFooter(ops.lang.events.message.isMentioned.footer + require("../package.json").version, client.user.displayAvatarURL({dynamic:true}))
        .setTimestamp()

    message.channel.send(main)
}
