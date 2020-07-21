module.exports = (client, message, args, ops) => {
  var request = require("request");
  var mcIP = 'landiacraft.net';
  let pingURL = "https://api.minetools.eu/ping/" + mcIP;
  let icon = "https://api.minetools.eu/favicon/" + mcIP;

  request(pingURL, async function(err, response, body) {
    if (err) return console.log(err.message);
    if (body.error)
      return message.channel.send(`**${mcIP} esta Apagado :octagonal_sign:**`);
    
    body = JSON.parse(body);
let descReplace = /§\w/g;
var replace = body.description.replace(descReplace, "");
    const embed = new ops.Discord.MessageEmbed()
      .setTitle("Estadisticas del servidor " + mcIP)
      .setColor("RANDOM")
      .addField('Descripcion: ', await replace, true)
      .addField("Latencia", body.latency, true)
      .addField("Jugadores",body.players.online + " Jugador(es)", true)
      .addField("Version", body.version.name + " (Protocolo " + body.version.protocol + ")", true);
if (body.favicon) {
      embed.setFooter(mcIP, icon);
      embed.setThumbnail(icon);
} else {
      embed.setFooter(mcIP);
}
    message.channel.send(embed);
  });
};
