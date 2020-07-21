const {crearDB} = require("megadb"),
 Weez = require("weez"),
 weez = new Weez.WeezAPI("dj2yme1qGIh9AMBpB6g46R3qqDYk3x7ZxHwh"),
 { MessageEmbed } = require("discord.js"),
 opciones = new crearDB("opciones");

module.exports = async (client, member) => {
if(!opciones.has(`${member.guild.id}.channels.logs`)) return;
  let logchannel = await opciones.get(`${member.guild.id}.channels.logs`);

if(opciones.has(`${member.guild.id}.channel.goodbye`)) {
let fondo = opciones.has(`${member.guild.id}.fondo.goodbye`) ? await opciones.get(`${member.guild.id}.fondo.goodbye`) : "http://i.imgur.com/0YrfJgx.jpg";
  let bienvenida = new Weez.Bienvenida()
    .avatar(member.user.displayAvatarURL).fondo(fondo).textoTitulo(`${member.user.username}`)
    .textoDesc("Adios, Esperemos que la hayas pasado bien").textoColor("27FF00").acceso(weez);
  const img = await Weez.bienvenidaRender(bienvenida),
        goodbyeChannel = await opciones.get(`${member.guild.id}.channel.goodbye`)
client.channels.cache.get(goodbyeChannel).send({files: [img]}); 
}
  const robot = { true: "Si", false: "No"},
      embed = new MessageEmbed()
    .setTitle("**「:x:」 • Miembro Dejado**")
    .setColor("RED")
    .setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
    .setFooter(`ID: ${member.user.id}`, client.user.avatarURL({dynamic:true}))
    .setTimestamp()
    .addField("**「:boy: 」• Nombre**", member.user.username, true)
    .addField("**「:family_wwg:」• Total de miembros**",member.guild.members.cache.filter(member => !member.user.bot).size,true)
    .addField("**「:calendar:」• Unido el**",member.joinedAt.toDateString(),true)
    .addField("**「:robot:」• Bot?**", robot[member.user.bot], true)
  let logginChannel = client.channels.cache.get(logchannel)
  if(!logginChannel) return;
  logginChannel.send(embed);

}
